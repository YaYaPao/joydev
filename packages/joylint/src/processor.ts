import { readFileSync } from 'node:fs'
import path from 'node:path'
import fs from 'node:fs'
import pico from 'picocolors'
import spawn from 'cross-spawn'
import { log, run } from './utils'
import { lintTools, huskyTools, huskyScriptPath } from './options'

function endWork(data: number, task: string) {
  if (data === 0) {
    log(`${pico.green(`[JOYLINT] ${task} success`)} Already up-to-date.`)
  } else {
    log(`${pico.green(`[JOYLINT] ${task} success`)} All tasks are already done.`)
  }
  process.exit(0)
}

/**
 * 安装指定依赖，如果已存在则跳过
 * @param manager Node.js package manager
 * @param cwd current work directory
 * @param dependencies waited to be installed
 * @returns length of installed dependencies
 */
function installDependencies(manager, cwd, dependencies): number {
  let deps = {}
  const packageInfo = JSON.parse(readFileSync(path.join(cwd, 'package.json'), 'utf-8'))
  if (packageInfo) {
    deps = {
      ...(packageInfo.dependencies || {}),
      ...(packageInfo.devDependencies || {}),
    }
  }
  // 判断本地是否已经安装相关依赖，如果已经安装则跳过该步骤，以用户手动安装版本，但是给出相关建议
  const data = []
  if (Array.isArray(dependencies) && dependencies.length) {
    dependencies.forEach(({ name, version }) => {
      if (deps[name]) {
        log(
          pico.yellow(
            `[Joylint]: Local package has installed ${name} with version: ${deps[name]}, the recommand version is ${version}.\nSkip the install task!\n`,
          ),
        )
      } else {
        data.push(`${name}@^${version}`)
      }
    })
  }

  // 如果不需要安装则直接退出
  if (data.length === 0) {
    return 0
  }

  let installArgs
  if (manager === 'yarn') {
    installArgs = ['add', '-D', ...data, '--verbose']
  } else if (manager === 'pnpm') {
    installArgs = ['add', '-D', ...data]
  } else {
    installArgs = ['install', '-D', ...data, '--no-audit', '--loglevel', 'error', '--verbose']
  }

  // install dependencies
  spawn.sync(manager, installArgs, { stdio: 'inherit', cwd })
  return data.length
}

/**
 * 初始化内置 lint 工具
 * @param manager Node.js package manager
 * @param cwd current work directory
 */
export function setupLintPackages(manager, cwd) {
  const res = installDependencies(manager, cwd, lintTools)
  endWork(res, 'Init lint tools')
}

export async function setupHusky(manager, cwd, joypath) {
  const res = installDependencies(manager, cwd, huskyTools)
  const existJoylintDir = await fs.existsSync(path.join(cwd, '.joylint'))
  const joylintPath = await path.join(cwd, '.joylint')

  if (!existJoylintDir) {
    log(pico.green(`[JOYLINT] Create .joylint at ${cwd}`))
    run(`mkdir ${joylintPath}`)
  }

  huskyScriptPath.forEach((p) => {
    const deletePath = path.join(joylintPath, p)
    const targetPath = path.join(cwd, `${joypath}/public/${p}`)
    run(`rf -f ${deletePath} && cp ${targetPath} ${joylintPath} `)
  })

  run(
    `npx husky install &&
     npx husky add .husky/commit-msg "node .joylint/verify_commit_msg.mjs" && 
     npx husky add .husky/pre-commit "node .joylint/lint_staged.mjs"`,
  )
  endWork(res, 'Init Git process')
}
