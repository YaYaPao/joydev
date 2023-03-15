import { queryPackage } from './queryer.mjs'
import { packages } from './config.mjs'
import path, { resolve } from 'node:path'

export const buildPackage = async (pkg) => {
  try {
    let target = pkg
    if (!pkg) {
      const choosePackage = await queryPackage(packages)
      target = choosePackage.package
    }
    let configPath
    switch (target) {
      case 'joylint':
        configPath = resolve(__dirname, '../packages/joylint/')
        break
      case 'joyutils':
        configPath = resolve(__dirname, '../packages/joyutils/')
        break
    }
    await $`pnpm run --prefix ${configPath} build`
    console.log(new Array(10).fill('-').join(''))
    await $`tree ${path.join(configPath, 'dist')}`
    return target
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
