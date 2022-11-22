import clear from 'clear'
import pico from 'picocolors'
import figlet from 'figlet'
import speed from 'figlet/importable-fonts/Speed.js'
import { log } from './utils'

export async function prework() {
  try {
    // clear screen
    await clear()
    // regist fonts
    figlet.parseFont('Speed', speed)
    // create art app
    const text = figlet.textSync('JOYLINT', {
      font: 'Speed',
    })
    log(pico.cyan(text))
  } catch (err) {
    console.log(err)
    log(
      `\n${Array(26).fill('-').join('')}${pico.bgYellow(' JOYLINT ')}${Array(26)
        .fill('-')
        .join('')}\n\n${pico.italic(`${pico.gray(`Welcome to use JOYLINT, nice to code!`)}`)}\n`,
    )
  }
}
