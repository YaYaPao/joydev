import tslintRules from './eslintOptions/tslintRules'
import { ReactParserOptions } from './eslintOptions/parserOptions'
import { reactRules, eslintRules, prettierConflictRules } from './eslintOptions/rules'
import { isTsProject } from './utils'

module.exports = {
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  parser: '@babel/eslint-parser',
  plugins: ['react', 'react-hooks'],
  // See: https://github.com/prettier/eslint-plugin-prettier/issues/102
  useTabs: false,
  // Global scope variables
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    ...reactRules,
    ...eslintRules,
    ...prettierConflictRules,
  },
  settings: {
    // support import modules from TypeScript files in JavaScript files
    'import/resolver': {
      node: {
        extensions: isTsProject ? ['.js', '.jsx', '.ts', '.tsx', '.d.ts'] : ['.js', '.jsx'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    // Add polyfills to the settings section of your eslint config. Append the name of the object and the property if one exists
    polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
  },
  overrides: isTsProject
    ? [
        {
          files: ['**/*.{ts,tsx}'],
          parser: '@typescript-eslint/parser',
          rules: tslintRules,
          extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
        },
      ]
    : [],
  parserOptions: ReactParserOptions,
}
