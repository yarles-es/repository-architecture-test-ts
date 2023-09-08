import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { HttpResponseHelper } from "../../utils/http-response-helpers/helpers";

export class CreateUserController implements IController<CreateUserParams> {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User | string>> {
    try {
        const { body } = httpRequest;

        if (!body) {
            return HttpResponseHelper.badRequest("Missing request body");
        }

        const user = await this.createUserRepository.createUser(body);

        return HttpResponseHelper.created(user);
    } catch (error) {
        return HttpResponseHelper.serverError();
    }
}

}
