const alastor = require('alastor');

alastor({
  url: 'https://example.com/json',
  method: 'POST',
  format: 'json',
}).then((res) => {
  console.log(res.body);
});
