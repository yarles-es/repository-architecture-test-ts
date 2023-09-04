import { User } from "../../models/user";
import { HttpResponse } from "../../controllers/protocols";

export class HttpResponseHelper {
  static badRequest(message: string): HttpResponse<User> {
    return {
      statusCode: 400,
      body: message,
    };
  }

  static serverError(): HttpResponse<User> {
    return {
      statusCode: 500,
      body: "Something went wrong",
    };
  }

  static ok<T>(data: T): HttpResponse<T> {
    return {
      statusCode: 200,
      body: data,
    };
  }

  static created(data: User): HttpResponse<User> {
    return {
      statusCode: 201,
      body: data,
    };
  }
}
