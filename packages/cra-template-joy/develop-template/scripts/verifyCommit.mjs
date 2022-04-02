import chalk from 'chalk'
import { resolve } from 'path'
import { readFileSync } from 'fs'

// Get commit message from file
const msgPath = resolve('./.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8')
  .trim()

const commitRE = /^(revert: )?(feat|improve|fix|docs|ref|chore|locale|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.error(
    '  ' +
      chalk.bgRed.white(' ERROR ') +
      ' ' +
      chalk.red('invalid commit message format.') +
      '\n\n' +
      chalk.red(
        'Proper commit message format is required for automated changelog generation. Examples:\n\n',
      ) +
      '\n    ' +
      chalk.green("\uD83D\uDCA5 feat(feature): add 'comments' option") +
      '\n    ' +
      chalk.green("\ud83c\udf0a improve: make some improvements") +
      '\n    ' +
      chalk.green('\uD83D\uDC1B fix: fix some bug') +
      '\n    ' +
      chalk.green('\uD83D\uDCDD docs: add some docs') +
      '\n    ' +
      chalk.green('\uD83D\uDCDD ref(refactor): make some refactor works') +
      '\n    ' +
      chalk.green('\uD83C\uDF37 UI(style): better styles') +
      '\n    ' +
      chalk.green('\uD83C\uDFF0 chore(compiler): Made some changes to the scaffolding') +
      '\n    ' +
      chalk.green(
        '\uD83C\uDF10 locale(compiler): Made a small contribution to internationalization',
      ) +
      chalk.green(
        '\uD83C\uDF10 rls(release): Made a release version',
      ) +
      '\n\n' +
      chalk.red('Normalize is required and having fun in coding~\n'),
  )
  process.exit(1)
}
