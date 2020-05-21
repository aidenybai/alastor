const alastor = require('alastor');

alastor({
  url: 'https://example.com/',
  method: 'GET',
  timeout: 666,
}).then((res) => {
  console.log(res.body);
});
