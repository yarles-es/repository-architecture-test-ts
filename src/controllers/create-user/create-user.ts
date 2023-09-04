import validator from "validator";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { HttpResponseHelper } from "../../utils/http-response-helpers/helpers";

export class CreateUserController implements IController<CreateUserParams> {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ["firstName", "lastName", "password", "email"];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof CreateUserParams]) {
          return HttpResponseHelper.badRequest(`${field} is required`);
        }
      }

      const emailIsvalid = validator.isEmail(httpRequest.body!.email);
      if (!emailIsvalid) {
        return HttpResponseHelper.badRequest("Invalid email");
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return HttpResponseHelper.created(user);
    } catch (error) {
      return HttpResponseHelper.serverError();
    }
  }
}
