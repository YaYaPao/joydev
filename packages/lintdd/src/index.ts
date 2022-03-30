import './reference/tsconfig4React.json'
import './reference/tsconfig4Vue3.json'
import './reference/tsconfig4TS.json'

const eslint4React = require('./eslint4React')
const eslint4Vue2 = require('./eslint4Vue2')
const eslint4Vue3 = require('./eslint4Vue3')
const eslint4TS = require('./eslint4TS')
const prettier = require('./prettier')
const stylelint = require('./stylelint')

module.exports = {
  eslint4React,
  eslint4Vue2,
  eslint4Vue3,
  eslint4TS,
  prettier,
  stylelint,
}
