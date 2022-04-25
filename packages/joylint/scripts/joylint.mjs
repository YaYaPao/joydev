#!/usr/bin/env zx

import { getPkgManager } from '../bin/utils.mjs'

const log = console.log
const ALERT_MESSAGE = '\nPlease confirm your input!\n'
const cmds = ['husky', 'lint']
const [nodePath, zxPath, scriptPath, ...restData] = process.argv
const workPath = process.env.originalWorkPath || process.cwd() || '.'

log(process.env.originalWorkPath)
log(process.cwd())

let choose
if (!restData || restData.length === 0) {
  const crt = await question('Choose command: ', {
    choices: cmds,
  })
  choose = crt.split(' ')
} else {
  choose = restData
}

// 支持多参数传递
const [target, ...rest] = choose
switch (target) {
  case 'lint':
    setupLint(rest)
    break
  case 'husky':
    initHusky(rest)
    break
  default:
    log(chalk.red(ALERT_MESSAGE))
    log(`Support command ===> ${cmds.join(' ')}`)
}

/**
 * 安装 lint 工具，从本地查询用户是否已安装指定 lint tools
 * ⚠️ 不要使用类似 npm list 来寻找，因为 npm/yarn/pnpm 的执行命令和输出内容不一致，直接从 package.json 内进行查看
 * @param {*} params
 */
async function setupLint(params) {
  const pm = await getPkgManager(workPath)
  // 指定 lintTool&version
  const lintVersion = {
    eslint: 8,
    prettier: 2,
    stylelint: 14,
  }
  let deps = {}
  const pkg = JSON.parse(fs.readFileSync(path.join(workPath, './package.json'), 'utf-8'))
  if (pkg) {
    deps = {
      ...(pkg.dependencies || {}),
      ...(pkg.devDependencies || {}),
    }
  }
  // 判断本地是否已经安装相关依赖，如果已经安装则跳过该步骤，以用户手动安装版本，但是给出相关建议
  const lintTools = []
  Object.entries(lintVersion).forEach(([key, value]) => {
    if (deps[key]) {
      log(
        chalk.yellowBright(
          `Local has installed ${key} with version: ${deps[key]}. Skip the install task!\n`,
        ),
      )
    } else {
      lintTools.push(key)
    }
  })

  // 如果不需要安装则直接退出
  if (lintTools.length === 0) {
    process.exit(0)
  }

  // 如果执行 $`pnpm add ${lintTools.join(' ')} -D` 会被编译成 `pnpm add $'eslint@8' -D`
  // 导致无法执行，所以这里展开依次进行执行
  // TODO: 优化代码
  switch (pm) {
    case 'pnpm':
      lintTools.includes('eslint') && (await $`pnpm add eslint@8 -D`)
      lintTools.includes('prettier') && (await $`pnpm add prettier@2 -D`)
      lintTools.includes('stylelint') && (await $`pnpm add stylelint@14 -D`)
      break
    case 'yarn':
      lintTools.includes('eslint') && (await $`yarn add eslint@8 -D`)
      lintTools.includes('prettier') && (await $`yarn add prettier@2 -D`)
      lintTools.includes('stylelint') && (await $`yarn add stylelint@14 -D`)
      break
    default:
      lintTools.includes('eslint') && (await $`npm install eslint@8 -D`)
      lintTools.includes('prettier') && (await $`npm install prettier@2 -D`)
      lintTools.includes('stylelint') && (await $`npm install stylelint@14 -D`)
  }
}

/**
 * 初始化 husky 并添加 commit-msg / pre-commit 钩子和执行脚本
 * @param {*} params
 */
async function initHusky(params) {
  const pm = await getPkgManager(workPath)
  const isOnly = params && Array.isArray(params) && params.includes('--only')
  // 处理 .joylint 逻辑
  if (!isOnly) {
    const existJoylintDir = await fs.existsSync(path.join(workPath, '.joylint'))
    const verifyCommitPath = await path.join(
      workPath,
      'node_modules/joylint/public/verify_commit_msg.mjs',
    )
    const lintStagedPath = await path.join(workPath, 'node_modules/joylint/public/lint_staged.mjs')
    const joylintPath = await path.join(workPath, '.joylint')
    // 不存在 .joylint 则需要创建一个
    if (!existJoylintDir) {
      await $`mkdir ${joylintPath}`
    }

    await $`cp ${verifyCommitPath} ${joylintPath}`
    await $`cp ${lintStagedPath} ${joylintPath}`
    log(chalk.cyan(`Current node package manager is ${pm}, start to install husky!\n`))
  }

  switch (pm) {
    case 'pnpm':
      await $`pnpm add husky lint-staged -D`
      await $`pnpx husky install`
      if (!isOnly) {
        await $`pnpx husky add .husky/commit-msg "node .joylint/verify_commit_msg.mjs"`
        await $`pnpx husky add .husky/pre-commit "node .joylint/lint_staged.mjs"`
      }
      break
    case 'yarn':
      await $`yarn add husky lint-staged -D`
      await $`yarn husky install`
      if (!isOnly) {
        await $`yarn husky add .husky/commit-msg "node .joylint/verify_commit_msg.mjs"`
        await $`yarn husky add .husky/pre-commit "node .joylint/lint_staged.mjs"`
      }
      break
    default:
      await $`npm install husky lint-staged -D`
      await $`npx husky install`
      if (!isOnly) {
        await $`npx husky add .husky/commit-msg "node .joylint/verify_commit_msg.mjs"`
        await $`npx husky add .husky/pre-commit "node .joylint/lint_staged.mjs"`
      }
  }
}
