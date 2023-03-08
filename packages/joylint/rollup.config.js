import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replacePlugin from '@rollup/plugin-replace'
import path from 'node:path'
import { defineConfig } from 'rollup'
import MagicString from 'magic-string'
import json from '@rollup/plugin-json'
import { fileURLToPath as __cjs_fileURLToPath } from 'node:url'
import { dirname as __cjs_dirname } from 'node:path'

const __filename = __cjs_fileURLToPath(import.meta.url)
const __dirname = __cjs_dirname(__filename)

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

      return {
        code: s.toString(),
        map: s.generateMap(),
      }
    },
  }
}

const plugins = [
  // add node option to declare Node.js env
  nodeResolve({ exportConditions: ['node'], preferBuiltins: true }),
  typescript({
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  }),
  commonjs({
    extensions: ['.js'],
  }),
  json(),
  // cjsPatchPlugin(),
]

const options = defineConfig([
  {
    input: {
      processor: path.resolve(__dirname, 'src/processor.ts'),
      prework: path.resolve(__dirname, 'src/prework.ts'),
      utils: path.resolve(__dirname, 'src/utils.ts'),
      entry: path.resolve(__dirname, 'src/entry.ts'),
    },
    output: [
      {
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
    ],
    plugins: [...plugins, cjsPatchPlugin()],
    external: [],
  },
  {
    input: {
      inquirer: path.resolve(__dirname, 'src/inquirer.ts'),
      options: path.resolve(__dirname, 'src/options.ts'),
    },
    output: [
      {
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
    ],
    plugins: [
      ...plugins,
      replacePlugin({
        values: {
          "'string_decoder/'": "'string_decoder/lib/string_decoder.js'",
        },
        delimiters: ['', ''],
      }),
    ],
    external: ['readable-stream'],
  },
])

export default () => {
  return defineConfig(options)
}
