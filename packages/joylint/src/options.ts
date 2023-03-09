const NPM_CHOICES = ['npm', 'yarn', 'pnpm']

const COMMAND_CHOICES = [
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

const FRAME_CHOICES = [
  {
    name: 'React + TypeScript + Prettier + Stylelint',
    value: 'react',
  },
  {
    name: 'Vue2 + Prettier + Stylelint',
    value: 'vue2',
  },
  {
    name: 'Vue3 + TypeScript + Prettier + Stylelint',
    value: 'vue3',
  },
]

const LINT_TOOLS = [
  {
    name: 'eslint',
  },
  {
    name: 'prettier',
  },
  {
    name: 'stylelint',
  },
]

const COMMON_DEPS = [
  {
    name: '@babel/core',
  },
  {
    name: 'typescript',
  },
  {
    name: 'eslint-config-prettier',
  },
  {
    name: 'eslint-plugin-prettier',
  },
  {
    name: 'eslint-plugin-promise',
  },
  {
    name: '@babel/eslint-parser',
  },
]

const REACT_DEPS = [
  ...COMMON_DEPS,
  {
    name: '@typescript-eslint/parser',
  },
  {
    name: '@typescript-eslint/eslint-plugin',
  },
  {
    name: 'eslint-plugin-react',
  },
  {
    name: 'eslint-plugin-react-hooks',
  },
  {
    name: '@babel/preset-env',
  },
  {
    name: '@babel/preset-react',
  },
  {
    name: '@babel/preset-typescript',
  },
  {
    name: '@babel/plugin-proposal-class-properties',
  },
  {
    name: '@babel/plugin-proposal-decorators',
  },
]

const VUE2_DEPS = [
  ...COMMON_DEPS,
  {
    name: 'vue-eslint-parser',
    version: '^8.3.0',
  },
]

const VUE3_DEPS = [
  ...COMMON_DEPS,
  {
    name: 'vue-eslint-parser',
  },
  {
    name: '@typescript-eslint/parser',
  },
  {
    name: 'eslint-plugin-vue',
  },
]

const STYLELINT_DEPS = [
  {
    name: 'stylelint-config-css-modules',
  },
  {
    name: 'stylelint-config-prettier',
  },
  {
    name: 'stylelint-config-standard',
  },
  {
    name: 'stylelint-declaration-block-no-ignored-properties',
  },
]

const HUSKY_DEPS = [
  {
    name: 'lint-staged',
  },
  {
    name: 'husky',
  },
]

const HUSKY_SCRIPT_PATH = ['verify_commit_msg.mjs', 'lint_staged.mjs']

export {
  COMMAND_CHOICES,
  NPM_CHOICES,
  FRAME_CHOICES,
  LINT_TOOLS,
  REACT_DEPS,
  VUE2_DEPS,
  VUE3_DEPS,
  STYLELINT_DEPS,
  HUSKY_DEPS,
  HUSKY_SCRIPT_PATH,
}
