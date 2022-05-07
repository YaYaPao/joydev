<h1 align="center">Rasa Open Source</h1>
<h5 align="center">Genki Dama OF Frontend's Lint!</h5>

<div align="center">

[![requirements](https://img.shields.io/badge/node-%3E8.0.0-brightgreenf)]()
[![code style](https://img.shields.io/badge/code%20style-prettier-%23ff69b4)]()

<img align="center" src="https://docs-1300606192.cos.ap-shanghai.myqcloud.com/showcase/joylint.jpg" alt="Enjoy linting!" title="PR welcome!">
</div>

<hr />

Joylint is the simplest way to enable lint-power for your project. Once installed, this:

- 👍 **Enable ESLint, Prettier, Stylelint, husky and lint-staged.**
- 🥰 **Includes powerful shortcodes** to execute on your dev process. It's based on husky and lint-staged.


## Installation

### Requirements

- Node.js 8.0.0+

Choose your favorite package manager:

```bash
# pnpm(recomanded)
pnpm add joylint -D

# npm
npm i joylint -D

# yarn
yarn add joylint -D
```

## Usage

Once you have installed joylint in your project. You can exec `pnpx joylint` to get some info. You will need to

```bash
# Install Eslint, Prettier and Stylelint for your project.
pnpx joylint lint

# Install husky and lint-staged for your project.
# Generate executable scripts in .joylint directory.
# Default to enable commit-msg and pre-commmit githooks.
pnpx joylint husky
```

### config *rc.js

Here's a quick demostration:

**.prettierrc.js**

```js
const joylintPrettier = require('joylint/dist/prettier')

module.exports = {
  ...joylintPrettier,
}
```

**.eslintrc.js**

Supported
- eslint4React
- eslint4Vue3
- eslint4Vue2
- eslint4TS

```js
// customized options
const customizedOptions = {}

module.exports = {
  extends: [require.resolve('joylint/dist/eslint4React')],
  ...customizedOptions,
}
```

**stylelintrc.js**

```js
// customized options
const customizedOptions = {
  ignoreFiles: ['index.html'],
}

module.exports = {
  extends: [require.resolve('joylint/dist/stylelint')],
  ...customizedOptions,
}
```

**tsconfig.json**

Supported
- tsconfig4React
- tsconfig4Vue3

It's highly recommmanded to refer to its content.

```json
{
  "extends": "./node_modules/joylint/dist/reference/tsconfig4React.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "types/**/*", "configs/**/*", "vite.config.ts"],
}
```

## License

Licensed under the MIT License.
