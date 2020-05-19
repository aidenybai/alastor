/**
 *
 * @class
 */
export default class Response {
  public ['constructor']: typeof Response;
  public body: any;
  public coreRes: any;
  public headers: any;
  public resOptions: any;
  public statusCode: number;
  public ok: boolean;

  /**
   * @param  {any} res
   * @param  {any} resOptions
   */
  public constructor(res: any, resOptions: any) {
    this.body = Buffer.alloc(0);
    this.coreRes = res;
    this.headers = res.headers;
    this.resOptions = resOptions;
    this.statusCode = res.statusCode;
    this.ok = res.statusCode === 200;
  }

  /**
   * @param  {any} chunk
   * @returns void
   */
  public _addChunk(chunk: any): void {
    this.body = Buffer.concat([this.body, chunk]);
  }

  /**
   * @returns Promise
   */
  public async json(): Promise<any> {
    return JSON.parse(this.body);
  }

  /**
   * @returns Promise
   */
  public async text(): Promise<string> {
    return this.body.toString();
  }
}
