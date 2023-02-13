import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import path from 'node:path'
import { defineConfig } from 'rollup'
import { fileURLToPath as __cjs_fileURLToPath } from 'node:url'
import { dirname as __cjs_dirname } from 'node:path'

const __filename = __cjs_fileURLToPath(import.meta.url)
const __dirname = __cjs_dirname(__filename)

const plugins = [
  // add node option to declare Node.js env
  nodeResolve(),
  typescript({
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  }),
  commonjs({
    extensions: ['.js'],
  }),
]

const options = defineConfig([
  {
    input: {
      index: path.resolve(__dirname, 'src/index.ts'),
    },
    output: [
      {
        dir: path.resolve(__dirname, 'dist'),
        entryFileNames: `[name].mjs`,
        // for export multi module
        exports: 'named',
        format: 'es',
        // Do not generate code to support live bindings
        externalLiveBindings: false,
        // Do not freeze namespace objects
        freeze: false,
      },
    ],
    plugins: [...plugins],
    external: [],
  },
])

export default () => {
  return defineConfig(options)
}
