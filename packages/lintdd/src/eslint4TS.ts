import tslintRules from './eslintOptions/tslintRules'
import { eslintRules, prettierConflictRules } from './eslintOptions/rules'
import { isTsProject } from './utils'

module.exports = {
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  parser: '@babel/eslint-parser',
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
    ...eslintRules,
    ...prettierConflictRules,
  },
  settings: {
    // support import modules from TypeScript files in JavaScript files
    'import/resolver': {
      node: {
        extensions: isTsProject ? ['.js', '.ts', '.d.ts'] : ['.js'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.d.ts'],
    },
    'import/extensions': ['.js', '.mjs', '.ts', '.d.ts'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    // Add polyfills to the settings section of your eslint config. Append the name of the object and the property if one exists
    polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
  },
  overrides: isTsProject
    ? [
        {
          files: ['**/*.{ts}'],
          parser: '@typescript-eslint/parser',
          extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
          rules: tslintRules,
        },
      ]
    : [],
}
