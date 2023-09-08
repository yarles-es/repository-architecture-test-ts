import validator from "validator";
import { CreateUserParams } from "../../controllers/create-user/protocols";
import { UpdateUserParams } from "../../controllers/update-user/protocols";
import { Params } from "../../controllers/protocols";

export class ValidationService {
  validateCreateUser(body: CreateUserParams): string | null {
    const requiredFields = ["firstName", "lastName", "password", "email"];

    for (const field of requiredFields) {
      if (!body?.[field as keyof CreateUserParams]) {
        return `${field} is required`;
      }
    }

    const emailIsValid = validator.isEmail(body.email);
    if (!emailIsValid) {
      return "Invalid email";
    }

    return null;
  }

  validateDeleteUser(params: Params): string | null {
    if (!params?.id) {
      return "Missing param: id";
    }
    return null;
  }

  validateUpdateUser(body: UpdateUserParams, params: Params): string | null {
    if (!body) {
      return "Missing body";
    }

    if (!params?.id) {
      return "Missing param: id";
    }

    const allowedFieldsToUpdate: (keyof CreateUserParams)[] = [
      "firstName",
      "lastName",
      "password",
    ];
    const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
      (key) => !allowedFieldsToUpdate.includes(key as keyof CreateUserParams)
    );

    if (someFieldIsNotAllowedToUpdate) {
      return "Some field is not allowed to update";
    }

    return null;
  }
}
