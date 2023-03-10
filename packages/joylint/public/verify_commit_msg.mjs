import { resolve } from 'path'
import { readFileSync } from 'fs'

function genHelpInfo() {
  const types = `
  feat | :sparkles: | :tada: -> add new feature/project
  docs | :memo: -> add or update documents
  style | :lipstick: -> add or update the UI and style files
  fix | :bug: -> fix a bug
  perf | :zap: -> improve performance
  ref | :recycle: -> refactor code
  rm | :fire: | :coffin: -> remove code or files
  break | :boom: -> introduce breaking changes
  conf | :wrench: | :hammer: -> add or update configuration or dev scripts
  locale | :globe_with_meridians: -> Made contributions to internationalization or localization
  rls | :bookmark: -> release or version tag 
  `
  console.log(`\n[Error] Invalid commit message. A Correct COMMIT MESSAGE should be like below:`)
  console.log('\x1b[33m%s', `\n    <type>(<scope>): <title><double breaks><body>`)
  console.log(
    '\x1b[37m',
    `\nInternal supported types, and you can see more on https://gitmoji.dev/:`,
  )
  console.log('\x1b[33m%s', `\n${types}`)
  console.log('\x1b[37m', '\nNice to code, bro!🦦')
}

// Get commit message from file
const msgPath = resolve('./.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()
const mArr = msg.split('\n\n')

// body can be empty
if (mArr.length > 2 || mArr.length === 0) {
  genHelpInfo()
  process.exit(1)
}

const [title, body] = mArr
const titleReg =
  /^(feat|docs|style|fix|perf|ref|rm|break|conf|locale|rls|:sparkles:|:memo:|:lipstick:|:bug:|:zap:|:recycle:|:fire:|:boom:|:wrench:|:globe_with_meridians:|:bookmark:)(\(\w+\))?:\s*.{1,70}/
const bodyReg = /^[A-Z0-9]{1}(.+)\.$/
if (titleReg.test(title)) {
  if (!!body && !bodyReg.test(body)) {
    genHelpInfo()
    process.exit(1)
  }
} else {
  genHelpInfo()
  process.exit(1)
}
