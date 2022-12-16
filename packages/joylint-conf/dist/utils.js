"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTsProject = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
// 根据是否含有 tsconfig.json 来判断当前项目是否为 TS 项目
exports.isTsProject = (0, node_fs_1.existsSync)(node_path_1.default.join(process.cwd() || '.', './tsconfig.json'));
