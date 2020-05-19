# Alastor <img src="https://badgen.net/npm/v/alastor?color=red&style=flat"> <img src="https://badgen.net/npm/dt/alastor?color=red&style=flat"> <img src="https://badgen.net/packagephobia/install/alastor?color=red&style=flat">

Hellish-fast asynchronous HTTP client for node.js

| 📖 [Documentation](https://alastor.js.org/globals) | ✨ [Examples](https://github.com/aidenybai/alastor/tree/master/examples) |
| -------------------------------------------------- | ------------------------------------------------------------------------ |


## Features

- ~**12kb** size ([smaller than the competition](#size-comparisons))
- Uses **TypeScript** that provides hints in editor, type checking, etc.
- **node-fetch** like API.
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

| Package    | Size                                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| alastor    | [![alastor package size](https://packagephobia.now.sh/badge?p=alastor)](https://packagephobia.now.sh/result?p=alastor)          |
| node-fetch | [![node-fetch package size](https://packagephobia.now.sh/badge?p=node-fetch)](https://packagephobia.now.sh/result?p=node-fetch) |
| axios      | [![axios package size](https://packagephobia.now.sh/badge?p=axios)](https://packagephobia.now.sh/result?p=axios)                |
| superagent | [![superagent package size](https://packagephobia.now.sh/badge?p=superagent)](https://packagephobia.now.sh/result?p=superagent) |
| request    | [![request package size](https://packagephobia.now.sh/badge?p=request)](https://packagephobia.now.sh/result?p=request)          |

## License

Refer to the [LICENSE](LICENSE) file.
