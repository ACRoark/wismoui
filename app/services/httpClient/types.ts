export interface IHttpError extends Error {
  code: number;
  reason: string;
}

export interface IHttpResponse {
  // tslint:disable-next-line: no-any
  data: any;
  status: number;
  statusText: string;
}

export interface IHttpClient {
  cancel: () => void;
  // tslint:disable-next-line: no-any
  get(url: string, config?: any): Promise<IHttpResponse>;
  // tslint:disable-next-line: no-any
  post(url: string, data: any, config?: any): Promise<IHttpResponse>;
  // tslint:disable-next-line: no-any
  wasCancelled: (error: any) => boolean;
}
