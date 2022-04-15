import { existsSync } from 'fs'
import { execSync } from 'child_process'
import * as path from 'path'

// 处理 args
const preprocessArgs = (arr) => {
  let res = {}
  if (arr && Array.isArray(arr) && arr.length > 0) {
    res['entryCommand'] = arr[0]
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

// 获取当前包管理工具
function getPkgManager(workPath) {
  const isPNpm = existsSync(path.join(workPath, './pnpm-lock.yaml'))
  const isYarn = existsSync(path.join(workPath, './yarn.lock'))
  if (isPNpm) return 'pnpm'
  if (isYarn) return 'yarn'
  return 'npm'
}

// 通过 child_process 来执行命令
function execSyncCommand(cmd) {
  if (!cmd) {
    log(chalk.red('Command is required!'))
    return
  }
  execSync(cmd, {
    stdio: 'inherit',
  })
}

export { preprocessArgs, getPkgManager, execSyncCommand }
