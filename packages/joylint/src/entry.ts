import { setupLintPackages, setupHusky } from './processor'
import type { EntryParams } from './typing'

export function start(params: EntryParams) {
  const { command, manager, framework, workPath, joyPath, ismemorepo } = params
  switch (command) {
    case 'lints': {
      setupLintPackages(manager, workPath, framework, ismemorepo, true)
      break
    }
    case 'gitprocess': {
      setupHusky(manager, workPath, joyPath, ismemorepo, true)
      break
    }
    case 'all': {
      setupLintPackages(manager, workPath, framework, ismemorepo, false)
      setupHusky(manager, workPath, joyPath, ismemorepo, true)
      break
    }
  }
}
