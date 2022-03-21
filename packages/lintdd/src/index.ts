import './reference/tsconfig4React.json'
import './reference/tsconfig4Vue3.json'

const eslint4React = require('./eslint4React')
const eslint4Vue2 = require('./eslint4Vue2')
const eslint4Vue3 = require('./eslint4Vue3')
const prettier = require('./prettier')
const stylelint = require('./stylelint')

module.exports = {
  eslint4React,
  eslint4Vue2,
  eslint4Vue3,
  prettier,
  stylelint,
}
