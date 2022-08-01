import { existsSync } from 'node:fs'
import childProcess from 'node:child_process'
import * as path from 'node:path'

export const log = console.log

// 根据是否含有 tsconfig.json 来判断当前项目是否为 TS 项目
export const isTsProject = existsSync(path.join(process.cwd() || '.', './tsconfig.json'))

// 处理 args
export const preprocessArgs = (arr: any) => {
  let res = {}
  if (arr && Array.isArray(arr) && arr.length > 0) {
    res['entry'] = arr[0]
    arr.forEach((item) => {
      const hasEuqal = String(item).includes('=')
      if (hasEuqal) {
        const [key, value] = item.split('=')
        res[key] = value
      } else {
        const startWithLabel = String(item).startsWith('--')
        if (startWithLabel) {
          const key = item.slice(2)
          res[key] = true
        } else {
          res[item] = true
        }
      }
    })
  }
  return res
}

export const run = (cmd: string, { unify = false } = {}) => {
  return new Promise((resolve) => {
    childProcess.exec(cmd, {}, (err, stdout, stderr) => {
      let output = ``
      if (unify) {
        output = stdout.toString() + stderr.toString()
      } else {
        output = stdout.toString()
      }
      resolve((err ? '' : output).trim())
    })
  })
}
