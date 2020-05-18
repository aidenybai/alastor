import Request from './Request';
import { URL } from 'url';

const core: any = (url: string, method: string) => new Request(url, method);

const alastor: any = async (opts: any) => {
  if (typeof opts !== 'string') {
    if (!opts.hasOwnProperty('url')) {
      throw new Error('Missing url option from options for request method.');
    }
  }

  const req: any = core(typeof opts === 'object' ? opts.url : opts, opts.method || 'GET');

  if (opts.headers) req.header(opts.headers);
  if (opts.stream) req.stream();
  if (opts.timeout) req.timeout(opts.timeout);
  if (opts.data) req.body(opts.data);
  if (opts.form) req.body(opts.form, 'form');
  if (opts.compression) req.compress();

  if (typeof opts.core === 'object') {
    Object.keys(opts.core).forEach((optName) => {
      req.option(optName, opts.core[optName]);
    });
  }

  const res: any = await req.send();

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
    } else return res.coreRes;
  }
};

alastor.promisified = alastor;

alastor.unpromisified = (opts: any, cb: any) => {
  alastor(opts)
    .then((data: any) => {
      if (cb) cb(null, data);
    })
    .catch((err: any) => {
      if (cb) cb(err, null);
    });
};

alastor.defaults = (defaultOpts: any) => async (opts: any) => {
  const nops: any = typeof opts === 'string' ? { url: opts } : opts;

  Object.keys(defaultOpts).forEach((doK: any) => {
    if (!nops.hasOwnProperty(doK) || nops[doK] === null) {
      nops[doK] = defaultOpts[doK];
    }
  });

  return await alastor(nops);
};

export default alastor;
