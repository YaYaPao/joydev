#!/usr/bin/env zx
import { resolve } from 'path'

const log = console.log
const ALERT_MESSAGE = chalk.red('\n🤔Something went wrong please try again!\n')
const cmds = ['dev', 'build', 'rls', 'example']
const versionGrade = ['major', 'minor', 'patch']
const [nodePath, zxPath, scriptPath, ...params] = process.argv

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
  default:
    log(ALERT_MESSAGE)
    process.exit(1)
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
