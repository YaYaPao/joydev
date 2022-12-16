"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ops_rules_1 = require("./ops_rules");
const ops_parser_1 = require("./ops_parser");
module.exports = {
    extends: [
        'plugin:vue/essential',
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
        ...ops_rules_1.vue2Rules,
        ...ops_rules_1.eslintRules,
        ...ops_rules_1.prettierConflictRules,
    },
    settings: {
        'import/extensions': ['.js', '.vue', '.mjs'],
        // Add polyfills to the settings section of your eslint config. Append the name of the object and the property if one exists
        polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
    },
    parserOptions: ops_parser_1.Vue2ParserOptions,
};
