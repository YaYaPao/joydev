#!/usr/bin/env node

import chalk from 'chalk'
import { readFileSync, writeFileSync } from 'fs'
import { exec } from 'child_process'
import { argv } from 'process'
import { preprocessArgs } from './utils.mjs'
import * as path from 'path'

const log = console.log
const args = preprocessArgs(process.argv.slice(2))
const params = args.entryCommand
// 在 esm 内读取 *.json 文件
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
const runVersion = process.versions
// 提取当前运行时 node 版本号的首字母
const nodeV = runVersion.node.split('.')[0]
// 指定执行脚本路径
const controlPath = path.join(process.cwd() || '.', './node_modules/joylint/')

const helpInfo = `
${chalk.greenBright(`Hi, thanks for using joylint~✨`)}

${chalk.blueBright(`Usage: `)} pnpx|npx joylint <command> [options]

${chalk.blueBright(`Options: `)}
  -v, --version   Output the current version.
  -h, --help      Output usage information.

${chalk.blueBright(`Commands: `)}
  husky [--cmt]   Install husky to use githooks and generate the commit verify-scripts.
`

// !params 什么都没传
if (argv.h || args.help || !params) {
  log(helpInfo)
  process.exit(0)
}

if (nodeV <= 8) {
  log(chalk.red('✘ The generator will only work with Node v8.0.0 and up!'))
  process.exit(1)
}

function execCommand(cmd) {
  if (!cmd) {
    log(chalk.red('Command is required!'))
    return
  }
  const subProcess = exec(cmd, function (err, stdout) {
    if (err) {
      console.error(err)
    }
    console.log(stdout)
    subProcess.kill()
  })
}
// 设置
function setEnvParams() {
  // 将当前 cwd 写入环境变量
  process.env.originalWorkPath = process.cwd()
}

setEnvParams()

switch (params) {
  case 'husky':
    if (args.cmt) {
      execCommand(`pnpm --prefix ${controlPath} run zx:lintdd husky cmt`)
    } else {
      execCommand(`pnpm --prefix ${controlPath} run zx:lintdd husky`)
    }
    break
  default:
    log(helpInfo)
}
