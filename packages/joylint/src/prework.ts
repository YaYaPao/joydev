import clear from 'clear'
import pico from 'picocolors'
import inquirer from 'inquirer'
import figlet from 'figlet'

const log = console.log

export async function prework() {
  try {
    // clear screen
    await clear()
    // create art app
    const text = figlet.textSync('JOYLINT', {
      font: 'default',
    })
    log(pico.cyan(text))
  } catch (err) {
    log(
      `\n${Array(26).fill('-').join('')}${pico.bgYellow(' JOYCRA ')}${Array(26)
        .fill('-')
        .join('')}\n\n${pico.italic(`${pico.gray(`Welcome to use JOYCRA, nice to code!`)}`)}\n`,
    )
  }
}

export async function requireName() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: `What's name of you awesome application?`,
      default: 'joyapp',
    },
  ])
  if (answers && answers.projectName) {
    return answers.projectName
  }
  log(pico.red(`Error throw from inquirer!`))
  process.exit(1)
}
