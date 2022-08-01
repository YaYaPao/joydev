import { readFileSync } from 'node:fs'
import path from 'node:path'
import pico from 'picocolors'
import spawn from 'cross-spawn'
import { log } from './utils'

export function setupLintPackages(npm, cwd) {
  const lintToolsVersion = {
    eslint: '8.20.0',
    prettier: '2.7.1',
    stylelint: '14.9.1',
  }
  let deps = {}
  const packageInfo = JSON.parse(readFileSync(path.join(cwd, 'package.json'), 'utf-8'))
  if (packageInfo) {
    deps = {
      ...(packageInfo.dependencies || {}),
      ...(packageInfo.devDependencies || {}),
    }
  }
  // 判断本地是否已经安装相关依赖，如果已经安装则跳过该步骤，以用户手动安装版本，但是给出相关建议
  const lintTools = []
  Object.entries(lintToolsVersion).forEach(([key, version]) => {
    if (deps[key]) {
      log(
        pico.yellow(
          `[Joylint]: Local package has installed ${key} with version: ${deps[key]}, the recommand version is ${version}.\nSkip the install task!\n`,
        ),
      )
    } else {
      lintTools.push(`${key}@^${version}`)
    }
  })

  // 如果不需要安装则直接退出
  if (lintTools.length === 0) {
    process.exit(0)
  }

  let installArgs
  if (npm === 'yarn') {
    installArgs = ['add', '-D', ...lintTools, '--verbose']
  } else if (npm === 'pnpm') {
    installArgs = ['install']
    installArgs = ['add', '-D', ...lintTools]
  } else {
    installArgs = ['install', '-D', ...lintTools, '--no-audit', '--loglevel', 'error', '--verbose']
  }

  // install dependencies
  spawn.sync(npm, installArgs, { stdio: 'inherit', cwd })
}
