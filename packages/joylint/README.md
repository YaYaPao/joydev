<h1 align="center">joylint</h1>
<h5 align="center">Genki dama of frontend's code grammar and dev process!</h5>

<div align="center">

[![requirements](https://img.shields.io/badge/node-%3E8.0.0-brightgreenf)]() [![code style](https://img.shields.io/badge/code%20style-prettier-%23ff69b4)]()

<img align="center" src="https://doc.joyjoy.cc/assets/showcase/joylint.png" alt="Enjoy linting!" title="PR welcome!">
</div>

<hr />

**Joylint** is the simplest way to enable lint-power for your project. Once installed, this:

- 👍 **Compose ESLint, Prettier, Stylelint, TypeScript => normalized rules**
- ✨ **Standardized Git process**
- 🥰 **Powerful .\*rc code snippets**

## Installation

### Prerequisites

If you want to **enable ESLint**, then Node.js (^12.22.0, ^14.17.0, or >=16.0.0) built with SSL support. (If you are using an official Node.js distribution, SSL is always built in.)

Choose your preferred package manager:

```bash
# npm
npm i @nofun/joylint -D

# yarn
yarn add @nofun/joylint -D
```

## Usage

Then excute `yarn joylint` to decide which task to do.

- Install lint tools, will auto install lint-tools and their dependencies, if you have installed, we will skip these packages.
- Init Husky Task will help you complete husky-realted process and create a rules's script in local.

```bash

> joylint
_________________  ___________________   _________
______  /_  __ \ \/ /__  /____  _/__  | / /__  __/
___ _  /_  / / /_  /__  /  __  / __   |/ /__  /
/ /_/ / / /_/ /_  / _  /____/ /  _  /|  / _  /
\____/  \____/ /_/  /_____/___/  /_/ |_/  /_/


? What do you want to do next? (Use arrow keys)
  Install lint tools, includes: Eslint, Prettier, Stylelint
  Init husky and generate githooks scripts, inclued: commit-msg, pre-commit
❯ All Above Task

```

## License

Licensed under the MIT License.
