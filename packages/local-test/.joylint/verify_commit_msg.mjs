import { resolve } from 'path'
import { readFileSync } from 'fs'

// Get commit message from file
const msgPath = resolve('./.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()

const commitRegExp = /^(revert: )?(feat|perf|fix|docs|ref|style|chore|locale|rls)(\(.+\))?: .{1,50}/

const helpInfo = `
Error invalid commit message format.

Proper commit message format is required for automated changelog generation. Examples:

  feat(feature): 🔥 add new feature"
  perf(performance): ⚡️ make some performance improvements'
  fix: 🐛 fix bug
  docs: 📖 add/update some docs
  ref(refactor): 👾 make some refactor works
  style: 🥳 better styles
  chore(compiler): 🐙 Made some changes to the scaffolding
  locale: 🌎 Made a small contribution to internationalization
  rls(release): 🎉 Made a new release

Have a great day and nice to code ~
`

if (!commitRegExp.test(msg)) {
  console.error(helpInfo)
  process.exit(1)
}
