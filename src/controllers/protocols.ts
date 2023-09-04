import { Request } from "express";

export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B> {
  body?: B;
  params?: Request["params"];
  headers?: Request["headers"];
}

export interface IController<T = unknown> {
  handle(httpRequest: HttpRequest<T>): Promise<HttpResponse<unknown>>;
}