import tslintRules from './eslintOptions/tslintRules'
import { eslintRules, prettierConflictRules } from './eslintOptions/rules'

module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
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
    ...tslintRules,
    ...prettierConflictRules,
  },
  settings: {
    // support import modules from TypeScript files in JavaScript files
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.d.ts'],
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
  parserOptions: {
    project: './tsconfig.json', // default project config
    createDefaultProgram: true, // 兼容未在 tsconfig.json 中 provided 的文件
  },
}
