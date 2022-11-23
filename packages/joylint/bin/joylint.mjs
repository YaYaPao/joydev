#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err
})

import pico from 'picocolors'
import { readFileSync } from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { preprocessArgs, log } from '../dist/utils.mjs'
import { prework } from '../dist/prework.mjs'
import { taskProcessor } from '../dist/inquirer.mjs'
import { start } from '../dist/entry.mjs'

// Used to correct current __filename and __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const cwd = process.cwd()
const nodeVersion = process.versions
// 提取当前运行时 node 版本号的首字母
const [major] = nodeVersion.node.split('.')

if (major < 8) {
  log(
    pico.red(`
  You are running Node ${major}.
  JOYLINT requires Node 8 or higher.
  Please update your version of Node.
  `),
  )
  process.exit(0)
}

// 在 esm 内读取 *.json 文件
const joylintPath = path.resolve(__dirname, '../')
const packageInfo = JSON.parse(readFileSync(path.join(joylintPath, 'package.json'), 'utf-8'))

const helpInfo = `
${pico.green(`Hi, thanks for using joylint~✨\n`)}

Package version: ${pico.green(`${packageInfo.version}`)}

${pico.blue(`Usage: `)} joylint <command> [options]

${pico.blue(`Commands: `)}
  install-lint        Install *lint tools.
  husky-scripts       Install husky to enable githooks and generate executable scripts.

Options:
  --version                 output the script version number
  --help                    print the help information

${pico.yellow(`Enjoying coding anyway!🎉`)}
`

const params = preprocessArgs(process.argv.slice(2))
const hasEntry = typeof params.entry !== 'undefined'

// 指定执行脚本路径
const controlPath = path.join(process.cwd() || '.', './node_modules/joylint/scripts')

await prework()

if (params.help) {
  log(helpInfo)
  process.exit(0)
}

if (params.version) {
  log(pico.green(`\n${packageInfo.version}\n`))
  process.exit(0)
}

let entryParams
if (!hasEntry) {
  log()
  entryParams = await taskProcessor()
  log(entryParams)
}

start({
  ...entryParams,
  workPath: cwd,
  joyPath: joylintPath,
})

// 根据参数执行指定命令
// switch (params.entry) {
//   case 'lint':
//     setupLintPackages('yarn', cwd)
//     break
//   case 'husky':
//     const execParams = []
//     if (params.only) {
//       execParams.push('--only')
//     }
//     const huskyCommand = `zx ${controlPath}/joylint.mjs husky ${execParams.join(' ')}`.trim()
//     run(huskyCommand)
//     break
//   default:
//     log(helpInfo)
// }
