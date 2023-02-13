import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { semverisons } from './config.mjs'
import { chdir } from 'node:process'
import { queryVersion } from './queryer.mjs'
import chalk from 'chalk'

const log = console.log

const getPackageVersion = (pkg) => {
  const packagePath = resolve(__dirname, `../packages/${pkg}/package.json`)
  const packageJSON = readFileSync(packagePath, 'utf-8')
  const content = (packageJSON && JSON.parse(packageJSON)) || {}
  return content.version || '1.0.0'
}

const genTargetVersion = (version, type) => {
  const arr = version.split('.')
  switch (type) {
    case 'patch':
      arr[2] = +arr[2] + 1
      break
    case 'minor':
      arr[2] = 0
      arr[1] = +arr[1] + 1
      break
    case 'major':
      arr[1] = arr[2] = 0
      arr[0] = +arr[0] + 1
      break
  }
  const res = arr.join('.')
  log(chalk.greenBright(`Change version to ${res}`))
  return res
}

/**
 * publishPackage 发布 package 到 npm registry
 * @param {*} pkg
 * @todo 1. 处理 git workspace is not empty
 */
export const publishPackage = async (pkg) => {
  const version = getPackageVersion(pkg)
  const choosen = await queryVersion(semverisons, version)
  const targetVersion = genTargetVersion(version, choosen.version)
  await chdir(resolve(__dirname, `../packages/${pkg}`))
  await $`pnpm version ${targetVersion}`
  await $`git add package.json`
  await $`git commit -m "rls(${pkg}): :bookmark: ${targetVersion}"`
  await $`pnpm publish`
}
