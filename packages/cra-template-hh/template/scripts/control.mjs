#!/usr/bin/env zx

import chalk from 'chalk'
import envConfig from '../config/env.mjs'

const log = console.log
const ALERT_MESSAGE = '\nPlease confirm your input!\n'
const cmds = ['dev', 'build']

// 判断是否传递 cmds, zx 执行，argv会多一个 zx 脚本路径
const args = process.argv.slice(3)
let choose
if (!args || args.length === 0) {
  const crt = await question('Choose command: ', {
    choices: cmds,
  })
  // 处理字符串
  choose = crt.split(' ')
} else {
  choose = args
}

// 根据参数进行路由判断
const [target, ...rest] = choose
switch (target) {
  case 'dev':
    develop(rest)
    break
  case 'build':
    build(rest)
    break
  default:
    log(chalk.red(ALERT_MESSAGE))
    log(`Support command ===> ${cmds.join(' ')}`)
}

async function develop() {
  // 设置环境变量
  const { developmentEnv } = envConfig || {}
  if (developmentEnv) {
    Object.entries(developmentEnv).forEach(([key, value]) => {
      process.env[key] = value
    })
  }
  await $`pnpx react-scripts start`
}

// 打包当前项目
async function build(values) {
  await $`pnpx react-scripts build`

  log(chalk.white.bgGreen.bold(`Successfully built at ${Date.now()}`))
}
