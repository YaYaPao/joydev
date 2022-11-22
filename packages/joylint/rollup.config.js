import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import path from 'node:path'
import { defineConfig } from 'rollup'
import MagicString from 'magic-string'
import json from '@rollup/plugin-json'

/**
 * Inject CJS Context for each deps chunk
 */
function cjsPatchPlugin() {
  const cjsPatch = `
import { fileURLToPath as __cjs_fileURLToPath } from 'node:url';
import { dirname as __cjs_dirname } from 'node:path';
import { createRequire as __cjs_createRequire } from 'node:module';

const __filename = __cjs_fileURLToPath(import.meta.url);
const __dirname = __cjs_dirname(__filename);
const require = __cjs_createRequire(import.meta.url);
const __require = require;
`.trimStart()

  return {
    name: 'cjs-chunk-patch',
    renderChunk(code, chunk) {
      const match = code.match(/^(?:import[\s\S]*?;\s*)+/)
      const index = match ? match.index + match[0].length : 0
      const s = new MagicString(code)
      // inject after the last `import`
      s.appendRight(index, cjsPatch)
      console.log('patched cjs context: ' + chunk.fileName)

      return {
        code: s.toString(),
        map: s.generateMap(),
      }
    },
  }
}

const options = defineConfig({
  input: {
    // processor: path.resolve(__dirname, 'src/processor.ts'),
    prework: path.resolve(__dirname, 'src/prework.ts'),
    utils: path.resolve(__dirname, 'src/utils.ts'),
  },
  output: {
    dir: path.resolve(__dirname, 'dist'),
    entryFileNames: `[name].mjs`,
    // for export multi module
    exports: 'named',
    format: 'esm',
    // Do not generate code to support live bindings
    externalLiveBindings: false,
    // Do not freeze namespace objects
    freeze: false,
  },
  plugins: [
    // add node option to declare Node.js env
    nodeResolve({ exportConditions: ['node'],preferBuiltins: true }),
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
    commonjs({
      extensions: ['.js'],
    }),
    json(),
    cjsPatchPlugin(),
  ],
  // external: ['inquirer', 'string_decoder', 'figlet'],
})

export default () => {
  return defineConfig([options])
}
