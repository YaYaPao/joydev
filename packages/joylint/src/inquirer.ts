import inquirer from 'inquirer'
import { log } from './utils'
import pico from 'picocolors'

const choices = [
  {
    name: 'Install lint tools, includes: Eslint, Prettier, Stylelint',
    value: 'lints',
  },
  {
    name: 'Init husky and generate githooks scripts, inclued: commit-msg, pre-commit',
    value: 'gitp',
  },
  {
    name: 'All Task',
    value: 'all',
  },
]

export async function taskProcessor() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'command',
      message: `What do you want to do next?`,
      default: 'all',
      choices: choices,
    },
  ])
  if (answers && answers.command) {
    return answers.command
  }
  log(pico.red(`Error throw from inquirer!`))
  process.exit(1)
}
