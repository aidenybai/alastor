const alastor = require('alastor');

alastor({
  url: 'https://example.com/',
  method: 'GET',
  compress: true,
})
  .then((res) => res.text())
  .then((body) => {
    console.log(body);
  });
