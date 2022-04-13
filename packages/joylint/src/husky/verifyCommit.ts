import chalk from 'chalk'
import { resolve } from 'path'
import { readFileSync } from 'fs'

// Get commit message from file
const msgPath = resolve('./.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()

const commitRE = /^(revert: )?(feat|perf|fix|docs|ref|chore|locale|rls)(\(.+\))?: .{1,50}/

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
      chalk.green("feat(feature): add 'comments' option") +
      '\n    ' +
      chalk.green('perf(performance): make some performance improvements') +
      '\n    ' +
      chalk.green('fix: fix bug') +
      '\n    ' +
      chalk.green('docs: add/update some docs') +
      '\n    ' +
      chalk.green('ref(refactor): make some refactor works') +
      '\n    ' +
      chalk.green('style: better styles') +
      '\n    ' +
      chalk.green('chore(compiler): Made some changes to the scaffolding') +
      '\n    ' +
      chalk.green('locale(compiler): Made a small contribution to internationalization') +
      chalk.green('rls(release): Made a release version') +
      '\n\n' +
      chalk.red('Normalize is required and having fun in coding~\n'),
  )
  process.exit(1)
}
