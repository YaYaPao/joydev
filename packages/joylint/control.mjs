#!/usr/bin/env zx

import chalk from 'chalk'

const log = console.log
const ALERT_MESSAGE = '\nPlease confirm your input!\n'
const cmds = ['build', 'rls']
const versionGrade = ['major', 'minor', 'patch']
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
  case 'build':
    build(rest)
    break
  case 'rls':
    release(...rest)
    break
  default:
    log(chalk.red(ALERT_MESSAGE))
    log(`Support command ===> ${cmds.join(' ')}`)
}

async function getPackageVersion() {
  const packageJson = await fs.readFile('./package.json', 'utf-8')
  const pkg = packageJson && JSON.parse(packageJson)
  return (pkg && pkg.version) || undefined
}

// 打包当前项目
async function build() {
  await $`rm -rf dist/*`
  await $`tsc --build tsconfig.json`
  await $`cp ./joylint.mjs ./dist/`
  log(chalk.white.bgGreen.bold(`Successfully built at ${Date.now()}`))
}

async function release(version) {
  await build()
  let targetVersion = version
  // 如果未传入，则提供选择
  if (!version) {
    const versionStr = await getPackageVersion()
    const versionArr = versionStr.split('.')
    if (versionStr) {
      const getVersionGrade = await question(
        `Current version is ${chalk.cyanBright(versionStr)} , and which do you want to add?\n`,
        {
          choices: versionGrade,
        },
      )
      switch (getVersionGrade) {
        case 'patch':
          versionArr[2] = Number(versionArr[2]) + 1
          targetVersion = versionArr.join('.')
          break
        case 'minor':
          // minor + 1, patch version 置为 0
          versionArr[1] = Number(versionArr[1]) + 1
          versionArr[2] = 0
          targetVersion = versionArr.join('.')
          break
        case 'major':
          // major + 1, patch version 置为 0
          versionArr[0] = Number(versionArr[0]) + 1
          versionArr[1] = 0
          versionArr[2] = 0
          targetVersion = versionArr.join('.')
          break
        default:
          versionArr[2] = Number(versionArr[2]) + 1
          targetVersion = versionArr.join('.')
          break
      }
    }
  }
  await $`pnpm version ${targetVersion}`
  await $`git add package.json`
  await $`git commit -m "rls: joylint ${targetVersion}"`
  await $`pnpm publish`
}

// 删除指定 tag 或者全部删除
async function deltag(name) {
  const shouldDeleteAll = name[0] === '--all'
  if (shouldDeleteAll) {
    await $`git tag -l | xargs git push origin -d`
    await $`git tag -l | xargs git tag -d`
    log(chalk.black.bgGreen.bold(`Successfully delete all tags on remote/local at ${Date.now()}`))
  } else {
    const deltags = name.join(' ')
    await $`git tag -d ${deltags}`
    await $`git push origin -d ${name.join(' ')}`
    log(chalk.black.bgGreen.bold(`Successfully delete ${deltags} on remote/local at ${Date.now()}`))
  }
}
