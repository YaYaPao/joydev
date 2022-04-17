#!/usr/bin/env zx

import chalk from 'chalk'
import { getPkgManager } from './bin/utils.mjs'

const log = console.log
const ALERT_MESSAGE = '\nPlease confirm your input!\n'
const cmds = ['husky']
const [nodePath, zxPath, scriptPath, ...restData] = process.argv
const workPath = process.env.originalWorkPath || process.cwd() || '.'

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

async function initHusky(params) {
  const hasCmt = params === 'cmt'
  const pm = await getPkgManager(workPath)
  const existJoylintDir = await fs.existsSync(path.join(workPath, '.joylint'))
  const verifyCommitPath = await path.join(
    workPath,
    'node_modules/joylint/dist/husky/verifyCommit.js',
  )
  // process.cwd() 返回当前执行命令的目录，由于通过 cli 执行 pnpm run，因此当前工作目录应该为 node_modules/joylint
  const joylintPath = await path.join(workPath, '.joylint')

  log(chalk.cyan(`Current joylintPath is ${joylintPath}!\n`))

  if (!existJoylintDir) {
    await $`mkdir ${joylintPath}`
  }

  await $`cp ${verifyCommitPath} ${joylintPath}`

  log(chalk.cyan(`Current node package manager is ${pm}, start to install husky!\n`))

  switch (pm) {
    case 'pnpm':
      await $`pnpm add husky -D`
      await $`pnpx husky install`
      hasCmt && (await $`pnpx husky add .husky/commit-msg "node .joylint/verifyCommit.js"`)
      break
    case 'yarn':
      await $`yarn add husky -D`
      await $`yarn husky install`
      hasCmt && (await $`yarn husky add .husky/commit-msg "node .joylint/verifyCommit.js"`)
      break
    default:
      await $`npm install husky -D`
      await $`npx husky install`
      hasCmt && (await $`npx husky add .husky/commit-msg "node .joylint/verifyCommit.js"`)
  }
}
