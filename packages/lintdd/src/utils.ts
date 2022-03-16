import { existsSync } from 'fs'
import * as path from 'path'

// 根据是否含有 tsconfig.json 来判断当前项目是否为 TS 项目
export const isTsProject = existsSync(path.join(process.cwd() || '.', './tsconfig.json'))
