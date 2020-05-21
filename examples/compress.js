const alastor = require('alastor');

alastor({
  url: 'https://example.com/',
  method: 'GET',
  compress: true,
}).then((res) => {
  console.log(res.body);
});
