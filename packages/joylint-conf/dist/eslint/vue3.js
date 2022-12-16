"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ops_rules_1 = require("./ops_rules");
const ops_parser_1 = require("./ops_parser");
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
        ...ops_rules_1.vue3Rules,
        ...ops_rules_1.eslintRules,
        ...ops_rules_1.prettierConflictRules,
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.d.ts'],
        },
        'import/extensions': ['.js', '.mjs', '.ts', '.d.ts'],
        'import/external-module-folders': ['node_modules', 'node_modules/@types'],
        polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
    },
    parserOptions: ops_parser_1.Vue3ParserOptions,
};
