# Alastor <img src="https://badgen.net/npm/v/alastor?color=red&style=flat"> <img src="https://badgen.net/npm/dt/alastor?color=red&style=flat"> <img src="https://badgen.net/packagephobia/install/alastor?color=red&style=flat">

Zero-bloat demonic HTTP client for NodeJS

## Installing

You will need NodeJS 8+. Refer to the Getting Started section to for quick start.

```bash
npm install alastor
```

## Simple Example

```js
const alastor = require('alastor');

alastor('https://example.com')
  .then((res) => res.text())
  .then((body) => {
    console.log(body);
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
