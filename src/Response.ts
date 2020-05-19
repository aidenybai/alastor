export default class Response {
  public ['constructor']: typeof Response;
  public body: any;
  public coreRes: any;
  public headers: any;
  public resOptions: any;
  public statusCode: number;
  public ok: boolean;

  public constructor(res: any, resOptions: any) {
    this.body = Buffer.alloc(0);
    this.coreRes = res;
    this.headers = res.headers;
    this.resOptions = resOptions;
    this.statusCode = res.statusCode;
    this.ok = res.statusCode === 200;
  }

  public _addChunk(chunk: any) {
    this.body = Buffer.concat([this.body, chunk]);
  }

  public async json() {
    return JSON.parse(this.body);
  }

  public async text() {
    return this.body.toString();
  }
}
