import { eslintRules, prettierConflictRules, vue2Rules } from './eslintOptions/rules'
import { Vue2ParserOptions } from './eslintOptions/parserOptions'

module.exports = {
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
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
    ...vue2Rules,
    ...eslintRules,
    ...prettierConflictRules,
  },
  settings: {
    'import/extensions': ['.js', '.vue', '.mjs'],
    // Add polyfills to the settings section of your eslint config. Append the name of the object and the property if one exists
    polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
  },
  parserOptions: Vue2ParserOptions,
}
