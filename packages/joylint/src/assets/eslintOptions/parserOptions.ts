/**
 * ESLint 中的 parserOptions.parser 用来指定 script 标签的解释器和规则
 * @link https://eslint.vuejs.org/rules/
 */
export enum SupportedFrame {
  React,
  Vue2,
}

export const ReactParserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
  babelOptions: {
    presets: [
      require.resolve('@babel/preset-env'),
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-typescript'),
    ],
    plugins: [
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
    ],
  },
  requireConfigFile: false,
  // 如果需要类型信息的话，需要通过 project 来指定 tsconfig.json 的路径，对应 @typescript-eslint/naming-convention 规则
  project: ['tsconfig.json'],
}

export const Vue2ParserOptions = {
  parser: '@babel/eslint-parser',
  sourceType: 'module',
  ecmaVersion: 2016,
}

export const Vue3ParserOptions = {
  parser: '@typescript-eslint/parser',
  ecmaVersion: 2020,
  sourceType: 'module',
  jsxPragma: 'React',
  ecmaFeatures: {
    jsx: true,
  },
}
