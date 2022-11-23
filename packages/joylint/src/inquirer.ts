import inquirer from 'inquirer'
import { log, getYarnInfo, getPnpmInfo, getNpmInfo } from './utils'
import pico from 'picocolors'
import { npmChoices } from './options'

const choices = [
  {
    name: 'Install lint tools, includes: Eslint, Prettier, Stylelint',
    value: 'lints',
  },
  {
    name: 'Init husky and generate githooks scripts, inclued: commit-msg, pre-commit',
    value: 'gitprocess',
  },
  {
    name: 'All Above Task',
    value: 'all',
  },
]

// Generate node package manager
async function genNpmChoices(): Promise<{ name: string; value: string }[]> {
  const res = await Promise.all([getYarnInfo(), getPnpmInfo(), getNpmInfo()])
  if (Array.isArray(res) && res.length) {
    return res.map(([name, version]) => {
      return {
        name: `${name} (${version})`,
        value: name,
      }
    })
  }
  return npmChoices.map((name) => ({ name, value: name }))
}

export async function taskProcessor() {
  const npmToolsChoices = await genNpmChoices()
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'command',
      message: `What do you want to do next?`,
      default: 'all',
      choices: choices,
    },
    {
      type: 'list',
      name: 'manager',
      message: `Which package manager to ues?`,
      default: 'yarn',
      choices: npmToolsChoices,
    },
  ])
  if (answers) {
    return answers
  }
  log(pico.red(`Error throw from inquirer!`))
  process.exit(1)
}
