#!/usr/bin/env zx

process.on('unhandledRejection', (err) => {
  throw err
})

import figlet from 'figlet'
import chalk from 'chalk'
import { queryCommand } from './queryer.mjs'
import { cmds } from './config.mjs'
import { buildPackage } from './build.mjs'
import { publishPackage } from './release.mjs'

const log = console.log
const [nodePath, zxPath, scriptPath, ...rest] = process.argv

const prework = async () => {
  await $`clear`
  const logoText = figlet.textSync('JOYDEV FUN!', {
    font: 'Small',
  })
  log(chalk.hex('#ef613e').bold(logoText))
  log()
}

await prework()

let answer = {}

if (!Array.isArray(rest) || rest.length === 0) {
  answer = await queryCommand(cmds)
} else {
  answer['command'] = rest[0]
  answer['package'] = rest[1]
}

switch (answer.command) {
  case 'build':
    await buildPackage(answer.package)
    break
  // relase 之前必须执行 build，因此根据其返回的 targetPackage 进行下一步赋值
  case 'release':
    const pkg = await buildPackage(answer.package)
    await publishPackage(pkg)
    break
}
