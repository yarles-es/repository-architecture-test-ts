import { User } from "../../models/user";
import { HttpResponseHelper } from "../../utils/http-response-helpers/helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return HttpResponseHelper.badRequest("Missing param: id");
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return HttpResponseHelper.ok<User>(user) ;
    } catch (error) {
      return HttpResponseHelper.serverError();
    }
  }
}
