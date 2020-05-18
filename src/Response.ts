export default class Response {
  public coreRes: any;
  public resOptions: any;
  public body: any;
  public headers: any;
  public statusCode: any;
  public ['constructor']: typeof Response;

  public constructor(res: any, resOptions: any) {
    this.coreRes = res;
    this.resOptions = resOptions;

    this.body = Buffer.alloc(0);

    this.headers = res.headers;
    this.statusCode = res.statusCode;
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
