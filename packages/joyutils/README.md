<h1 align="center">joyutils</h1>
<h5 align="center">Cute JavaScript Library!</h5>

<div align="center">

_Every developer should have their own effective library!_

![node-version](https://img.shields.io/badge/node-%3E8.0.0-brightgreenf) ![prettier](https://img.shields.io/badge/code%20style-prettier-%23ff69b4)

<hr />

**joyutils** is a Javascript library, and which come from my engineering experience.

## Installation

Only support:

- Node.js 8.0.0+

Choose your favorite package manager:

```bash
# npm
npm i @nofun/joyutils -D

# yarn
yarn add @nofun/joyutils -D
```

## Usage

See [document](https://doc.joyjoy.cc/docs/project/frontend-toolkit-chain/joyutils/) for more information.

## FAQ

### Why named export?

1. Module is a namespace. Default export often leads to function/component per file dogma and makes code less maintainable.
2. Interop with commonjs is broken in many cases or hard to maintain.
3. Show me any good language with default exports. It's historical javascriptism.

## License

Licensed under the MIT License.
