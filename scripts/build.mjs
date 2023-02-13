import { queryPackage } from './queryer.mjs'
import { packages } from './config.mjs'
import { resolve } from 'node:path'

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
        configPath = resolve(__dirname, '../packages/joylint/rollup.config.js')
        $`rollup -c ${configPath}`
        break
      case 'joyutils':
        configPath = resolve(__dirname, '../packages/joyutils/rollup.config.js')
        $`rollup -c ${configPath}`
        break
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
