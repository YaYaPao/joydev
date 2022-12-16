#!/usr/bin/env zx
const log = console.log
const ALERT_MESSAGE = chalk.red('\n🤔Something went wrong please try again!\n')
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
  await $`cp -R src/tsconf/ dist/tsconf/`
  log(
    chalk.white.bgGreen.bold(
      `Successfully built at ${new Date().toLocaleString()}\n\n`
    )
  )
  await $`tree dist`
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
        `Current version is ${chalk.cyanBright(
          versionStr
        )} , and which do you want to add?\n`,
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
