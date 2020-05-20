const alastor = require('alastor');

alastor({
  url: 'https://example.com/',
  method: 'GET',
  timeout: 666,
})
  .then((res) => res.text())
  .then((body) => {
    console.log(body);
  });
