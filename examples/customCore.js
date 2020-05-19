const alastor = require('alastor');

alastor({
  url: 'https://example.com',
  core: {
    // Alastor allows you to set core HTTP options
    // (https://nodejs.org/api/http.html#http_http_request_url_options_callback)
    agent: userAgent,
  },
})
  .then((res) => res.text())
  .then((body) => {
    console.log(body);
  });
