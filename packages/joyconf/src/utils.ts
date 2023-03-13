import { existsSync } from 'node:fs'
import * as path from 'node:path'
// 根据是否含有 tsconfig.json 来判断当前项目是否为 TS 项目
export const isTsProject = existsSync(
  path.join(process.cwd() || '.', './tsconfig.json')
)
