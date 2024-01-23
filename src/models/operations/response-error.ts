
export class ResponseError {
  message: String;
  title?: String;
  statusCode?:number;
  moreInfo?:string;
  constructor(msg: string, title?: string,code?: number,info?: string) {
    this.message = msg;
    this.title = title;
    this.statusCode=code;
    this.moreInfo=info;
  }
}
