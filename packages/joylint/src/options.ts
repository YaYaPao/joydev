const npmChoices = ['npm', 'yarn', 'pnpm']

const lintTools = [
  {
    name: 'eslint',
    version: '8.20.0',
  },
  {
    name: 'prettier',
    version: '2.7.1',
  },
  {
    name: 'stylelint',
    version: '14.9.1',
  },
]

const huskyTools = [
  {
    name: 'husky',
    version: 'latest',
  },
  {
    name: 'lint-staged',
    version: 'latest',
  },
]

const huskyScriptPath = ['verify_commit_msg.mjs', 'lint_staged.mjs']

export { npmChoices, lintTools, huskyTools, huskyScriptPath }
