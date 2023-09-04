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
      const id = httpRequest?.params?.id;
      const body = httpRequest.body;

      if (!body) {
        return HttpResponseHelper.badRequest("Missing body");
      }

      if (!id) {
        return HttpResponseHelper.badRequest("Missing id");
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return HttpResponseHelper.badRequest(
          "Some field is not allowed to update"
        );
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return HttpResponseHelper.ok<User>(user);
    } catch (error) {
      return HttpResponseHelper.serverError();
    }
  }
}
