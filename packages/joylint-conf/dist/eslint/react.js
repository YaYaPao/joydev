"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ops_parser_1 = require("./ops_parser");
const ops_rules_1 = require("./ops_rules");
const utils_1 = require("../utils");
const esReact = {
    extends: ['plugin:react/recommended', 'prettier'],
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
        ...ops_rules_1.reactRules,
        ...ops_rules_1.eslintRules,
        ...ops_rules_1.prettierConflictRules,
    },
    settings: {
        // support import modules from TypeScript files in JavaScript files
        'import/resolver': {
            node: {
                extensions: utils_1.isTsProject
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
    overrides: utils_1.isTsProject
        ? [
            {
                files: ['**/*.{ts,tsx}'],
                parser: '@typescript-eslint/parser',
                rules: ops_rules_1.typescriptRules,
                extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
            },
        ]
        : [],
    parserOptions: ops_parser_1.ReactParserOptions,
};
exports.default = esReact;
