# Alastor <img src="https://badgen.net/npm/v/alastor?color=red&style=flat"> <img src="https://badgen.net/npm/dt/alastor?color=red&style=flat"> <img src="https://badgen.net/david/dep/aidenybai/alastor?color=red&style=flat">

Hellish-fast asynchronous HTTP client for node.js

## Install

```bash
npm i alastor
```

### Quick Demos

Simple Example:

```js
await alastor({
  url: 'https://example.com',
  method: 'GET',
  data: {
    foo: 'bar',
  },
});
```

### Unpromisified Usage

```js
const alastor = require('alastor');

alastor.unpromisified('https://example.com', (err, res) => {
  if (!err) console.log(res.body);
});
```

Simple parsing of JSON:

```js
const res = await alastor({
  url: 'https://example.com',
  parse: 'json',
});

console.log(res.body);
```

### Default Options

```js
const a = alastor.defaults({
  method: 'POST',
  parse: 'json',
  timeout: 666,
});

const res = await a('https://example.com');
```

### Custom Core HTTP Options

Alastor allows you to set [core HTTP options](https://nodejs.org/api/http.html#http_http_request_url_options_callback).

```js
await alastor({
  url: 'https://example.com',
  core: {
    agent: userAgent,
  },
});
```

## Comparisons

| Package          | Size                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| alastor          | [![alastor package size](https://packagephobia.now.sh/badge?p=alastor)](https://packagephobia.now.sh/result?p=alastor)                            |
| snekfetch        | [![snekfetch package size](https://packagephobia.now.sh/badge?p=snekfetch)](https://packagephobia.now.sh/result?p=snekfetch)                      |
| node-fetch       | [![node-fetch package size](https://packagephobia.now.sh/badge?p=node-fetch)](https://packagephobia.now.sh/result?p=node-fetch)                   |  |
| axios            | [![axios package size](https://packagephobia.now.sh/badge?p=axios)](https://packagephobia.now.sh/result?p=axios)                                  |
| isomorphic-fetch | [![isomorphic-fetch package size](https://packagephobia.now.sh/badge?p=isomorphic-fetch)](https://packagephobia.now.sh/result?p=isomorphic-fetch) |
| got              | [![got package size](https://packagephobia.now.sh/badge?p=got)](https://packagephobia.now.sh/result?p=got)                                        |
| superagent       | [![superagent package size](https://packagephobia.now.sh/badge?p=superagent)](https://packagephobia.now.sh/result?p=superagent)                   |
| request          | [![request package size](https://packagephobia.now.sh/badge?p=request)](https://packagephobia.now.sh/result?p=request)                            |
