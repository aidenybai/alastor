import path from 'path';
import http from 'http';
import https from 'https';
import qs from 'querystring';
import zlib from 'zlib';
import { URL } from 'url';
import Response from './Response';

const supportedCompressions: string[] = ['gzip', 'deflate'];

/**
 * Request class that interfaces with http
 * @class
 */
export default class Request {
  public ['constructor']: typeof Request;
  public compressionEnabled: boolean;
  public coreOptions: any;
  public data: any;
  public method: string;
  public reqHeaders: any;
  public resOptions: any;
  public sendDataAs: any;
  public streamEnabled: boolean;
  public timeoutTime: number;
  public url: URL;

  /**
   * @param  {string} url
   * @param  {string} method
   * @returns this
   */
  public constructor(url: string, method: string) {
    this.compressionEnabled = false;
    this.coreOptions = {};
    this.data = null;
    this.method = method || 'GET';
    this.reqHeaders = {};
    this.sendDataAs = null;
    this.streamEnabled = false;
    this.timeoutTime = 0;
    this.url = typeof url === 'string' ? new URL(url) : url;

    this.resOptions = {
      maxBuffer: 50 * 1000000,
    };

    return this;
  }
  /**
   * @param  {any} a1
   * @param  {any} a2
   */
  public query(a1: any, a2: any): this {
    if (typeof a1 === 'object') {
      Object.keys(a1).forEach((queryKey) => {
        this.url.searchParams.append(queryKey, a1[queryKey]);
      });
    } else this.url.searchParams.append(a1, a2);

    return this;
  }
  /**
   * @param  {any} relativePath
   */
  public path(relativePath: any): this {
    this.url.pathname = path.join(this.url.pathname, relativePath);

    return this;
  }
  /**
   * @param  {any} data
   * @param  {any} sendAs?
   * @returns data
   */
  public body(data: any, sendAs?: any): this {
    this.sendDataAs =
      typeof data === 'object' && !sendAs && !Buffer.isBuffer(data)
        ? 'json'
        : sendAs
        ? sendAs.toLowerCase()
        : 'buffer';
    this.data =
      this.sendDataAs === 'form'
        ? qs.stringify(data)
        : this.sendDataAs === 'json'
        ? JSON.stringify(data)
        : data;

    return this;
  }
  /**
   * @param  {any} key
   * @param  {any} val?
   */
  public header(key: any, val?: any): this {
    if (typeof key === 'object') {
      Object.keys(key).forEach((headerName: any) => {
        this.reqHeaders[headerName.toLowerCase()] = key[headerName];
      });
    } else this.reqHeaders[key.toLowerCase()] = val;

    return this;
  }
  /**
   * @param  {number} timeout
   * @returns this
   */
  public timeout(timeout: number): this {
    this.timeoutTime = timeout;

    return this;
  }
  /**
   * @param  {any} name
   * @param  {any} value
   * @returns this
   */
  public option(name: any, value: any): this {
    this.coreOptions[name] = value;

    return this;
  }

  /**
   * @returns this
   */
  public stream(): this {
    this.streamEnabled = true;

    return this;
  }

  /**
   * @returns this
   */
  public compress(): this {
    this.compressionEnabled = true;

    if (!this.reqHeaders['accept-encoding'])
      this.reqHeaders['accept-encoding'] = supportedCompressions.join(', ');

    return this;
  }
  /**
   * @returns Promise
   */
  public send(): Promise<Response> {
    return new Promise((resolve: any, reject: any) => {
      if (this.data) {
        if (!this.reqHeaders.hasOwnProperty('content-type')) {
          if (this.sendDataAs === 'json') {
            this.reqHeaders['content-type'] = 'application/json';
          } else if (this.sendDataAs === 'form') {
            this.reqHeaders['content-type'] = 'application/x-www-form-urlencoded';
          }
        }

        if (!this.reqHeaders.hasOwnProperty('content-length')) {
          this.reqHeaders['content-length'] = Buffer.byteLength(this.data);
        }
      }

      const options: any = Object.assign(
        {
          protocol: this.url.protocol,
          host: this.url.hostname,
          port: this.url.port,
          path: this.url.pathname + this.url.search,
          method: this.method,
          headers: this.reqHeaders,
        },
        this.coreOptions
      );

      let req: any;

      const resHandler: any = (res: any) => {
        let stream: any = res;

        if (this.compressionEnabled) {
          if (res.headers['content-encoding'] === 'gzip') {
            stream = res.pipe(zlib.createGunzip());
          } else if (res.headers['content-encoding'] === 'deflate') {
            stream = res.pipe(zlib.createInflate());
          }
        }

        let alastorRes: Response;

        if (this.streamEnabled) {
          resolve(stream);
        } else {
          alastorRes = new Response(res, this.resOptions);

          stream.on('error', (err: any) => {
            reject(err);
          });

          stream.on('data', (chunk: any) => {
            alastorRes._addChunk(chunk);

            if (
              this.resOptions.maxBuffer !== null &&
              alastorRes.body.length > this.resOptions.maxBuffer
            ) {
              stream.destroy();

              reject(
                `Received a response which was longer than acceptable when buffering. (${this.body.length} bytes)`
              );
            }
          });

          stream.on('end', () => {
            resolve(alastorRes);
          });
        }
      };

      if (this.url.protocol === 'http:') {
        req = http.request(options, resHandler);
      } else if (this.url.protocol === 'https:') {
        req = https.request(options, resHandler);
      } else throw new Error(`Bad URL protocol: ${this.url.protocol}`);

      if (this.timeoutTime) {
        req.setTimeout(this.timeoutTime, () => {
          req.abort();

          if (!this.streamEnabled) {
            reject(new Error('Timeout reached'));
          }
        });
      }

      req.on('error', (err: any) => {
        reject(err);
      });

      if (this.data) req.write(this.data);

      req.end();
    });
  }
}
