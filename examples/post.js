const alastor = require('alastor');

alastor({
  url: 'https://example.com/json',
  method: 'POST',
})
  .then((res) => res.json())
  .then((body) => {
    console.log(body);
  });
