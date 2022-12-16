"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vue3ParserOptions = exports.Vue2ParserOptions = exports.ReactParserOptions = exports.SupportedFrame = void 0;
/**
 * ESLint 中的 parserOptions.parser 用来指定 script 标签的解释器和规则
 * @link https://eslint.vuejs.org/rules/
 */
var SupportedFrame;
(function (SupportedFrame) {
    SupportedFrame[SupportedFrame["React"] = 0] = "React";
    SupportedFrame[SupportedFrame["Vue2"] = 1] = "Vue2";
})(SupportedFrame = exports.SupportedFrame || (exports.SupportedFrame = {}));
exports.ReactParserOptions = {
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
};
exports.Vue2ParserOptions = {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    ecmaVersion: 2016,
};
exports.Vue3ParserOptions = {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
        jsx: true,
    },
};
