import { User } from "../../models/user";
import { HttpResponseHelper } from "../../utils/http-response-helpers/helpers";
import { IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUserController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();
      return HttpResponseHelper.ok<User[]>(users);
    } catch (error) {
      return HttpResponseHelper.serverError();
    }
  }
}
