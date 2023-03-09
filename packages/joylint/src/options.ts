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
    version: '^8.20.0',
  },
  {
    name: 'prettier',
    version: '^2.7.1',
  },
  {
    name: 'stylelint',
    version: '^14.9.1',
  },
]

const COMMON_DEPS = [
  {
    name: '@babel/core',
    version: '^7.16.0',
  },
  {
    name: 'typescript',
    version: '^4.6.2',
  },
  {
    name: 'eslint-config-prettier',
    version: '^8.4.0',
  },
  {
    name: 'eslint-plugin-prettier',
    version: '^4.0.0',
  },
  {
    name: 'eslint-plugin-promise',
    version: '^6.0.0',
  },
  {
    name: '@babel/eslint-parser',
    version: '^7.17.0',
  },
]

const REACT_DEPS = [
  ...COMMON_DEPS,
  {
    name: '@typescript-eslint/parser',
    version: '^5.13.0',
  },
  {
    name: '@typescript-eslint/eslint-plugin',
    version: '^5.13.0',
  },
  {
    name: 'eslint-plugin-react',
    version: '^7.29.2',
  },
  {
    name: 'eslint-plugin-react-hooks',
    version: '^4.3.0',
  },
  {
    name: '@babel/preset-env',
    version: '^7.16.11',
  },
  {
    name: '@babel/preset-react',
    version: '^7.16.7',
  },
  {
    name: '@babel/preset-typescript',
    version: '^7.16.7',
  },
  {
    name: '@babel/plugin-proposal-class-properties',
    version: '^7.16.7',
  },
  {
    name: '@babel/plugin-proposal-decorators',
    version: '^7.17.2',
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
    version: '^8.3.0',
  },
  {
    name: '@typescript-eslint/parser',
    version: '^5.13.0',
  },
  {
    name: 'eslint-plugin-vue',
    version: '^9.8.0',
  },
]

const STYLELINT_DEPS = [
  {
    name: 'stylelint-config-css-modules',
    version: '^3.0.0',
  },
  {
    name: 'stylelint-config-prettier',
    version: '^9.0.3',
  },
  {
    name: 'stylelint-config-standard',
    version: '^25.0.0',
  },
  {
    name: 'stylelint-declaration-block-no-ignored-properties',
    version: '^2.5.0',
  },
]

const HUSKY_DEPS = [
  {
    name: 'lint-staged',
    version: 'latest',
  },
  {
    name: 'husky',
    version: 'latest',
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
