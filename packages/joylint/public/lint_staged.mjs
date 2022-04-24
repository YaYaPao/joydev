import lintStaged from 'lint-staged'
import { readFileSync } from 'fs'

// 避免因为没有安装相关 lint 工具而报错
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
const defaultLinter = ['eslint', 'prettier', 'stylelint']
let linter = []
if (pkg) {
  const deps = {
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {}),
  }
  linter = defaultLinter.filter((item) => (deps[item] ? true : false))
}
const config = {
  '*.{js,jsx,ts,tsx}': [],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [],
  'package.json': [],
  '*.vue': [],
  '*.{scss,less,styl,html}': [],
  '*.md': [],
}

if (linter.length === 0) {
  console.log('No lint tool supported, please install package: eslint, prettier, stylelint')
  process.exit(0)
}

// 根据安装 lint 工具来生成对应的配置
if (linter.includes('eslint')) {
  config['*.{js,jsx,ts,tsx}'].push('eslint --fix')
  config['*.vue'].push('eslint --fix')
}
if (linter.includes('stylelint')) {
  config['*.vue'].push('stylelint --fix')
  config['*.{scss,less,styl,html}'].push('stylelint --fix')
}
if (linter.includes('prettier')) {
  config['*.{js,jsx,ts,tsx}'].push('prettier --write')
  config['package.json'].push('prettier --write')
  config['*.vue'].push('prettier --write')
  config['*.{scss,less,styl,html}'].push('prettier --write')
  config['*.md'].push('prettier --write')
  config['{!(package)*.json,*.code-snippets,.!(browserslist)*rc}'].push(
    'prettier --write--parser json',
  )
}

const options = {
  allowEmpty: false,
  concurrent: true,
  config,
  cwd: process.cwd(),
  debug: false,
  maxArgLength: null,
  quiet: false,
  relative: false,
  shell: false,
  stash: true,
  verbose: false,
}

try {
  const passed = await lintStaged(options)
  process.exitCode = passed ? 0 : 1
} catch (error) {
  process.exitCode = 1
}
