#!/usr/bin/env zx

import chalk from 'chalk'

const log = console.log
const ALERT_MESSAGE = '\nPlease confirm your input!\n'
const cmds = ['husky']
const [nodePath, zxPath, scriptPath, ...restData] = process.argv

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
  case 'husky':
    initHusky(...rest)
    break
  default:
    log(chalk.red(ALERT_MESSAGE))
    log(`Support command ===> ${cmds.join(' ')}`)
}

// 查看当前的包管理工具
async function getPkgManager() {
  const isPNpm = await fs.existsSync(path.join(process.cwd() || '.', './pnpm-lock.yaml'))
  const isYarn = await fs.existsSync(path.join(process.cwd() || '.', './yarn.lock'))
  if (isPNpm) return 'pnpm'
  if (isYarn) return 'yarn'
  return 'npm'
}

async function initHusky(params) {
  const hasCmt = params === 'cmt'
  const pm = await getPkgManager()
  const isLintddDir = await fs.existsSync(path.join(process.cwd() || '.', '.lintdd'))
  const verifyCommitPath = await path.join(
    process.cwd() || '.',
    'node_modules/lintdd/dist/husky/verifyCommit.mjs',
  )
  const lintddPath = await path.join(process.cwd() || '.', '.lintdd')

  if (!isLintddDir) {
    await $`mkdir .lintdd`
    await $`cp ${verifyCommitPath} ${lintddPath}`
  }

  switch (pm) {
    case 'pnpm':
      await $`pnpm add husky -D`
      await $`pnpx husky install`
      hasCmt && (await $`pnpx husky add .husky/commit-msg "node .lintdd/verifyCommit.mjs"`)
      break
    case 'yarn':
      await $`yarn add husky -D`
      await $`yarn husky install`
      hasCmt && (await $`yarn husky add .husky/commit-msg "node .lintdd/verifyCommit.mjs"`)
      break
    default:
      await $`npm add husky -D`
      await $`npx husky install`
      hasCmt && (await $`npx husky add .husky/commit-msg "node .lintdd/verifyCommit.mjs"`)
  }
}
