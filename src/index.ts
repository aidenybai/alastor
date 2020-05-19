import { URL } from 'url';
import Request from './Request';

const fetch: any = (url: string, method: string) => new Request(url, method);

const Alastor: any = async (opts: any) => {
  if (typeof opts !== 'string') {
    if (!opts.hasOwnProperty('url')) {
      throw new Error('Missing url option from options for request method.');
    }
  }

  const req: any = fetch(typeof opts === 'object' ? opts.url : opts, opts.method || 'GET');

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

  return req.send();
};

export default Alastor;
