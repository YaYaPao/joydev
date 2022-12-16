import { eslintRules, prettierConflictRules, vue3Rules } from './ops_rules'
import { Vue3ParserOptions } from './ops_parser'

module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  plugins: ['vue'],
  // 顶级域变量
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    ...vue3Rules,
    ...eslintRules,
    ...prettierConflictRules,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.d.ts'],
    },
    'import/extensions': ['.js', '.mjs', '.ts', '.d.ts'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
  },
  parserOptions: Vue3ParserOptions,
}
