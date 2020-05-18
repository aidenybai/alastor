const { URL } = require('url');
const Request = require('./Request');
const http = (url, method) => new Request(url, method);

const alastor = async (opts) => {
  if (typeof opts !== 'string') {
    if (!opts.hasOwnProperty('url')) {
      throw new Error('Missing url option from options for request method.');
    }
  }

  const req = http(typeof opts === 'object' ? opts.url : opts, opts.method || 'GET');

  if (opts.headers) req.header(opts.headers);
  if (opts.stream) req.stream();
  if (opts.timeout) req.timeout(opts.timeout);
  if (opts.data) req.body(opts.data);
  if (opts.form) req.body(opts.form, 'form');
  if (opts.compression) req.compress();
  if (opts.agent) req.option('agent', opts.agent);

  const res = await req.send();

  if (res.headers.hasOwnProperty('location') && opts.followRedirects) {
    opts.url = new URL(res.headers['location'], opts.url).toString();

    return await alastor(opts);
  }

  if (opts.stream) {
    res.stream = res;

    return res;
  } else {
    res.coreRes.body = res.body;

    if (opts.parse && opts.parse === 'json') {
      res.coreRes.body = await res.json();

      return res.coreRes;
    } else {
      return res.coreRes;
    }
  }
};

alastor.promisified = alastor;

alastor.unpromisified = (opts, cb) => {
  alastor(opts)
    .then((data) => {
      if (cb) cb(null, data);
    })
    .catch((err) => {
      if (cb) cb(err, null);
    });
};

alastor.defaults = (defaultOpts) => async (opts) =>
  await alastor(Object.assign(defaultOpts, typeof opts === 'string' ? { url: opts } : opts));

module.exports = alastor;
