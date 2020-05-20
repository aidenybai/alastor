# Alastor <img src="https://badgen.net/npm/v/alastor?color=red&style=flat"> <img src="https://badgen.net/npm/dt/alastor?color=red&style=flat"> <img src="https://badgen.net/packagephobia/install/alastor?color=red&style=flat">

Hellish-fast asynchronous HTTP client for NodeJS

| 📖 [Documentation](https://alastor.js.org/globals) | ✨ [Examples](https://github.com/aidenybai/alastor/tree/master/examples) | 🖥️ [Github](https://github.com/aidenybai/alastor/) |
| -------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------- |


## Features

- ~**12kb** size ([smaller than the competition](#size-comparisons))
- Uses **TypeScript** that provides hints in editor, type checking, etc.
- Asynchronous, allowing both .then chaining and async/await
- No dependencies
- Class abstraction

## Installing

> **[Node.js](https://nodejs.org/) 8.0.0 or newer is required**

```bash
npm install alastor
```

## Simple Example

```js
// Require using ES6 syntax
import Alastor from 'alastor';

// Or using old fancy style
const Alastor = require('alastor');

// async based implementation
(async () => {
  const res = await alastor('https://example.com');
  const body = await res.text();
})();

// .then based implementation
alastor('https://example.com')
  .then((res) => res.text())
  .then((body) => {
    console.log(body);
  })
  .catch((err) => {
    console.error(err);
  });
```

More examples can be found in [the examples folder](https://github.com/aidenybai/alastor/tree/master/examples).

## Size Comparisons

Alastor is designed to be as light-weight as possible but also have a programmatically powerful API.
| Package | Size |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| alastor | [![alastor package size](https://badgen.net/packagephobia/install/alastor?style=flat)](https://packagephobia.now.sh/result?p=alastor) |
| node-fetch | [![node-fetch package size](https://badgen.net/packagephobia/install/node-fetch?style=flat)](https://packagephobia.now.sh/result?p=node-fetch) |
| axios | [![axios package size](https://badgen.net/packagephobia/install/axios?style=flat)](https://packagephobia.now.sh/result?p=axios) |
| superagent | [![superagent package size](https://badgen.net/packagephobia/install/superagent?style=flat)](https://packagephobia.now.sh/result?p=superagent) |
| request | [![request package size](https://badgen.net/packagephobia/install/request?style=flat)](https://packagephobia.now.sh/result?p=request) |

## License

Refer to the [LICENSE](LICENSE) file.
