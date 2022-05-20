#!/usr/bin/env zx
import { resolve } from 'path'
import dayjs from 'dayjs'

const log = console.log
const ALERT_MESSAGE = chalk.red('\n🤔Something went wrong please try again!\n')
const cmds = ['dev', 'build', 'rls', 'example', 'help']
const versionLevel = ['major', 'minor', 'patch']
const [nodePath, zxPath, scriptPath, ...params] = process.argv

const HELP_INFO = `
${chalk.greenBright(`Hi, thanks for using joyutils with zx~✨\n`)}

${chalk.blueBright(`Commands: `)}
  dev                 tsc --watch
  build               tsc
  rls                 Release to npm registry!
    --set-version     Set target version.
  example             Compile the example index.ts and execute it.
  help                Show some helps!

${chalk.yellowBright(`Nice to code!🎉`)}
`

// choices: string[]
let choices
if (!params || params.length === 0) {
  const crt = await question('Supported commands: ', {
    choices: cmds,
  })
  choices = crt.split(' ')
} else {
  choices = params
}

const [entry, ...options] = choices

switch (entry) {
  case 'dev':
    exeDevelop(options)
    break
  case 'build':
    exeBuild(options)
    break
  case 'example':
    exeExample(options)
    break
  case 'rls':
    exeRelease(options)
    break
  case 'help':
    log(HELP_INFO)
    break
  default:
    log(HELP_INFO)
    log(ALERT_MESSAGE)
    process.exit(1)
}

async function getPackageVersion() {
  const packageJson = await fs.readFile('./package.json', 'utf-8')
  const pkg = packageJson && JSON.parse(packageJson)
  return (pkg && pkg.version) || undefined
}

async function exeDevelop(options) {
  await $`tsc --watch`
}

async function exeBuild(options) {
  await $`tsc`
}

async function exeExample(options) {
  const examplePath = resolve(__dirname, '../example/')
  await exeBuild()
  await $`tsc --project ${examplePath}/tsconfig.example.json`
  await $`node ${examplePath}/index.js`
}

async function choosePackageVersion() {
  const versionStr = await getPackageVersion()
  const versionArr = versionStr.split('.')
  let targetVersion
  if (versionStr) {
    const getVersionGrade = await question(
      `Current version is ${chalk.cyanBright(
        versionStr
      )} ,which level do you want to add?\n`,
      {
        choices: versionLevel,
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
  return targetVersion
}

// pnpm run zx rls --set-version 1.0.0
async function exeRelease(options) {
  let setVersion
  const versionIndex = options.findIndex((i) => i === '--set-version')
  if (versionIndex === -1) {
    setVersion = await choosePackageVersion()
  } else {
    setVersion = options[versionIndex + 1]
  }
  await exeBuild()
  await $`pnpm version ${setVersion}`
  await $`git add package.json`
  await $`git commit -m "rls: joyutils ${setVersion} at ${dayjs().format(
    'YYYY-MM-DD HH:mm:ss'
  )}"`
  // 开通 2FA 之后， npm 每次 publish 都要 one-time-password，因此需要手动发布
  // await $`pnpm publish`
}
