import { setupLintPackages, setupHusky } from './processor'

export function start(params: {
  command: string
  manager: string
  joyPath: string
  workPath: string
  framework: string
}) {
  const { command, manager, framework, workPath, joyPath } = params
  switch (command) {
    case 'lints': {
      setupLintPackages(manager, workPath, framework, true)
      break
    }
    case 'gitprocess': {
      setupHusky(manager, workPath, joyPath, true)
      break
    }
    case 'all': {
      setupLintPackages(manager, workPath, framework, false)
      setupHusky(manager, workPath, joyPath, true)
      break
    }
  }
}
