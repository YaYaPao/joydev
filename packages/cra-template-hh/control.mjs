#!/usr/bin/env zx

const log = console.log
const ALERT_MESSAGE = '\nPlease confirm your input!\n'
const cmds = ['rls']
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
  case 'rls':
    release(...rest)
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

async function release(version) {
  let targetVersion = version
  // 如果未传入，则提供选择
  if (!version) {
    const versionStr = await getPackageVersion()
    const versionArr = versionStr.split('.')
    if (versionStr) {
      const getVersionGrade = await question(
        `Current version is ${versionStr} , and which do you want to add?\n`,
        {
          choices: versionGrade,
        }
      )
      switch (getVersionGrade) {
        case 'patch':
          versionArr[2] = Number(versionArr[2]) + 1
          targetVersion = versionArr.join('.')
          break
        case 'minor':
          versionArr[1] = Number(versionArr[1]) + 1
          targetVersion = versionArr.join('.')
          break
        case 'major':
          versionArr[0] = Number(versionArr[0]) + 1
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
  await $`git commit -m "rls: cra-template-hh ${targetVersion}"`
  await $`pnpm publish`
}
