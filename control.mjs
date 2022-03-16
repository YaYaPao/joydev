#!/usr/bin/env zx
import chalk from 'chalk'
import { existsSync } from 'fs'

const log = console.log
const ALERT_MESSAGE = '\nPlease confirm your input!\n'
const cmds = ['publish', 'initcrapp']
const packages = ['cra-template-hh']
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
  case 'publish':
    publish(...rest)
    break
  case 'initcrapp':
    initcrapp(...rest)
    break
  default:
    log(ALERT_MESSAGE)
    log(`Support command ===> ${cmds.join(' ')}`)
}

async function getPackageVersion() {
  const packageJson = await fs.readFile('./package.json', 'utf-8')
  const pkg = packageJson && JSON.parse(packageJson)
  return (pkg && pkg.version) || undefined
}

async function initcrapp() {
  const hasCrapp = await existsSync('crapp')
  if (hasCrapp) {
    await $`rm -rf crapp`
  }
  await $`pnpx create-react-app crapp --template hh`
}

// 发布指定 package
async function publish(pkg) {
  let choosedPackage = pkg
  // 如果未传入，则提供选择
  if (!pkg) {
    choosedPackage = await question(`Which package do you want to publish?\n`, {
      choices: packages,
    })
    const path = `packages/${choosedPackage}`
    log(chalk.bgGray.cyanBright(`\nCurrent package is ${choosedPackage}\n\n`))
    await $`pnpm run --prefix ${path} zx rls patch`
  }
}
