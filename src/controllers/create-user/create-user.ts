import validator from "validator";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      //validação do body;
      const requiredFields = ["firstName", "lastName", "password", "email"];
      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof CreateUserParams]) {
          return { statusCode: 400, body: `Missing param: ${field}` };
        }
      }

      //validação do email
      const emailIsvalid = validator.isEmail(httpRequest.body!.email);
      if (!emailIsvalid) {
        return { statusCode: 400, body: "Invalid email" };
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return { statusCode: 201, body: user };
    } catch (error) {
      return { statusCode: 500, body: "Something went wrong" };
    }
  }
}
