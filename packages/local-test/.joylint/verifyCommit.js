"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var path_1 = require("path");
var fs_1 = require("fs");
// Get commit message from file
var msgPath = (0, path_1.resolve)('./.git/COMMIT_EDITMSG');
var msg = (0, fs_1.readFileSync)(msgPath, 'utf-8').trim();
var commitRE = /^(revert: )?(feat|perf|fix|docs|ref|chore|locale|rls)(\(.+\))?: .{1,50}/;
if (!commitRE.test(msg)) {
    console.error('  ' +
        chalk_1.default.bgRed.white(' ERROR ') +
        ' ' +
        chalk_1.default.red('invalid commit message format.') +
        '\n\n' +
        chalk_1.default.red('Proper commit message format is required for automated changelog generation. Examples:\n\n') +
        '\n    ' +
        chalk_1.default.green("feat(feature): add 'comments' option") +
        '\n    ' +
        chalk_1.default.green('perf(performance): make some performance improvements') +
        '\n    ' +
        chalk_1.default.green('fix: fix bug') +
        '\n    ' +
        chalk_1.default.green('docs: add/update some docs') +
        '\n    ' +
        chalk_1.default.green('ref(refactor): make some refactor works') +
        '\n    ' +
        chalk_1.default.green('style: better styles') +
        '\n    ' +
        chalk_1.default.green('chore(compiler): Made some changes to the scaffolding') +
        '\n    ' +
        chalk_1.default.green('locale(compiler): Made a small contribution to internationalization') +
        chalk_1.default.green('rls(release): Made a release version') +
        '\n\n' +
        chalk_1.default.red('Normalize is required and having fun in coding~\n'));
    process.exit(1);
}
