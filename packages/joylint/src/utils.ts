import { existsSync } from 'node:fs'
import childProcess from 'node:child_process'
import * as path from 'node:path'

export const log = console.log

// 根据是否含有 tsconfig.json 来判断当前项目是否为 TS 项目
export const isTsProject = existsSync(path.join(process.cwd() || '.', './tsconfig.json'))

// 处理 args
export const preprocessArgs = (arr: any) => {
  const res = {}
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
  return new Promise((resolve, reject) => {
    childProcess.exec(cmd, {}, (err, stdout, stderr) => {
      let output = ``
      if (unify) {
        output = stdout.toString() + stderr.toString()
      } else {
        output = stdout.toString()
      }
      if (err) {
        reject(err)
      }
      resolve((err ? '' : output).trim())
    })
  })
}

const determineFound = (name, version, appPath) => {
  if (version === 'N/A') {
    return Promise.resolve([name, 'N/A'])
  }
  if (!version || Object.keys(version).length === 0) return Promise.resolve([name, 'Not Found'])
  if (!appPath) return Promise.resolve([name, version])
  return Promise.resolve([name, version, appPath])
}

export async function getNpmInfo() {
  const v = run(`npm -v`)
  const w = run(`which npm`)
  const [version, binPath] = await Promise.all([v, w])
  return determineFound('npm', version, binPath)
}

export async function getPnpmInfo() {
  const v = run(`pnpm -v`)
  const w = run(`which pnpm`)
  const [version, binPath] = await Promise.all([v, w])
  return determineFound('pnpm', version, binPath)
}

export async function getYarnInfo() {
  const v = run(`yarn -v`)
  const w = run(`which yarn`)
  const [version, binPath] = await Promise.all([v, w])
  return determineFound('yarn', version, binPath)
}
