#!/usr/bin/env node

import yParser from 'yargs-parser'
import chalk from 'chalk'
import { readFileSync, writeFileSync } from 'fs'
import { exec } from 'child_process'
import { argv } from 'process'
import * as path from 'path'

const log = console.log
const args = yParser(process.argv.slice(2))
const params = args._[0]
// 在 esm 内读取 *.json 文件
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
const runVersion = process.versions
// 提取当前运行时 node 版本号的首字母
const nodeV = runVersion.node.split('.')[0]
const controlPath = path.join(process.cwd() || '.', './node_modules/lintdd/')

const helpInfo = `
${chalk.greenBright(`Hi, thanks for using lintdd~✨`)}

${chalk.blueBright(`Usage: `)} pnpx|npx lintdd <command> [options]

${chalk.blueBright(`Options: `)}
  -v, --version   Output the current version.
  -h, --help      Output usage information.

${chalk.blueBright(`Commands: `)}
  husky [--cmt]   Install husky to use githooks and generate the commit verify-scripts.
`

if (args.v || args.version) {
  log(chalk.cyan(pkg.version))
  process.exit(0)
}

// !params 什么都没传
if (argv.h || args.help || !params) {
  log(helpInfo)
  process.exit(0)
}

// `pnpm lintdd | -h | --help` 展示提示信息
if (args.v || args.version) {
  log(chalk.cyan(pkg.version))
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