import inquirer from 'inquirer'
import { log, getYarnInfo, getPnpmInfo, getNpmInfo } from './utils'
import pico from 'picocolors'
import { COMMAND_CHOICES, NPM_CHOICES, FRAME_CHOICES } from './options'

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
  return NPM_CHOICES.map((name) => ({ name, value: name }))
}

export async function taskProcessor() {
  try {
    const npmToolsChoices = await genNpmChoices()
    let answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'command',
        message: `What do you want to do next?`,
        default: 'all',
        choices: COMMAND_CHOICES,
      },
      {
        type: 'list',
        name: 'manager',
        message: `Which package manager to ues?`,
        default: 'yarn',
        choices: npmToolsChoices,
      },
    ])
    if (['all', 'lints'].includes(answers.command)) {
      const frame_answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'command',
          message: `Which frame you are using?`,
          default: 'react',
          choices: FRAME_CHOICES,
        },
      ])
      answers = {
        ...answers,
        ...frame_answer,
      }
    }
    return answers
  } catch (error) {
    log(pico.red(`Error throw from inquirer!`))
    process.exit(1)
  }
}
