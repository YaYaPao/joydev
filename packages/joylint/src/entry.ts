import { setupLintPackages, setupHusky } from './processor'

export function start(params: {
  command: string
  manager: string
  joypath: string
  workPath: string
}) {
  const { command, manager, workPath, joypath } = params
  switch (command) {
    case 'lints': {
      setupLintPackages(manager, workPath)
      break
    }
    case 'gitprocess': {
      setupHusky(manager, workPath, joypath)
      break
    }
    case 'all': {
      setupLintPackages(manager, workPath)
      setupHusky(manager, workPath, joypath)
      break
    }
  }
}
