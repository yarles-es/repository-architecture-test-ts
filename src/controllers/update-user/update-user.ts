import { User } from "../../models/user";
import { HttpResponseHelper } from "../../utils/http-response-helpers/helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController<UpdateUserParams> {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      if (!httpRequest.params || !httpRequest.body) {
        return HttpResponseHelper.badRequest("Missing parameters or body");
      }

      const { id } = httpRequest.params;
      const { body } = httpRequest;

      const user = await this.updateUserRepository.updateUser(id, body);

      return HttpResponseHelper.ok<User>(user);
    } catch (error) {
      return HttpResponseHelper.serverError();
    }
  }
}
