import { ReactParserOptions } from './ops_parser'
import {
  reactRules,
  eslintRules,
  typescriptRules,
  prettierConflictRules,
} from './ops_rules'
import { isTsProject } from '../utils'

module.exports = {
  extends: ['plugin:react/recommended', 'prettier'],
  parser: '@babel/eslint-parser',
  plugins: ['react', 'react-hooks'],
  // See: https://github.com/prettier/eslint-plugin-prettier/issues/102
  // useTabs: false,
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
        extensions: isTsProject
          ? ['.js', '.jsx', '.ts', '.tsx', '.d.ts']
          : ['.js', '.jsx'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    // Add polyfills to the settings section of your eslint config. Append the name of the object and the property if one exists
    polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
    // https://www.npmjs.com/package/eslint-plugin-react
    react: {
      version: 'detect',
    },
  },
  overrides: isTsProject
    ? [
        {
          files: ['**/*.{ts,tsx}'],
          parser: '@typescript-eslint/parser',
          rules: typescriptRules,
          extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
        },
      ]
    : [],
  parserOptions: ReactParserOptions,
}
