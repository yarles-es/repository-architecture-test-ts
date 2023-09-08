export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export type Params = { [key: string]: string };
export type Headers = { [key: string]: string };
export type Query = { [key: string]: string | string[] };

export interface HttpRequest<B> {
  body?: B;
  params?: Params;
  headers?: Headers;
  query?: Query;
}

export interface IController<T = unknown> {
  handle(httpRequest: HttpRequest<T>): Promise<HttpResponse<unknown>>;
}
