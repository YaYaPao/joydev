import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { semverisons } from './config.mjs'
import { chdir, cwd } from 'node:process'
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
 * @summary
 * 1. 通过 --no-git-checks 来避免 publish 时 pnpm 的 git 前置检查，处理 Git work directory is not clean
 * 2. 通过 `&&` 处理 work directiry 定位问题，详见 https://stackoverflow.com/questions/19803748/change-working-directory-in-my-current-shell-context-when-running-node-script
 * 3. ⚠️ 一定要通过 pnpm 进行发布操作，不然会将 package.json.dependencies 的 workspace:* 直接提交，pnpm 会将其转换为正确版本
 */
export const publishPackage = async (pkg) => {
  const version = getPackageVersion(pkg)
  const choosen = await queryVersion(semverisons, version)
  const targetVersion = genTargetVersion(version, choosen.version)

  await $`cd ${resolve(__dirname, `../packages/${pkg}`)} && 
  pwd &&
  pnpm version ${targetVersion} &&
  git add package.json &&
  git commit -m "rls(${pkg}): :bookmark: ${targetVersion}" &&
  pnpm publish --no-git-checks
  `
}
