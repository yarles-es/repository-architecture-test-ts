import { NextFunction, Request, Response } from "express";
import { HttpResponseHelper } from "../../utils/http-response-helpers/helpers";
import { ValidationService } from "./validation-service";

export class UserValidate {
  private validationService = new ValidationService();

  validateCreateUser(req: Request, _res: Response, next: NextFunction) {
    const error = this.validationService.validateCreateUser(req.body);
    if (error) {
      return HttpResponseHelper.badRequest(error);
    }
    next();
  }

  validateDeleteUser(req: Request, _res: Response, next: NextFunction) {
    const error = this.validationService.validateDeleteUser(req.params);
    if (error) {
      return HttpResponseHelper.badRequest(error);
    }
    next();
  }

  validateUpdateUser(req: Request, _res: Response, next: NextFunction) {
    const error = this.validationService.validateUpdateUser(req.body, req.params);
    if (error) {
      return HttpResponseHelper.badRequest(error);
    }
    next();
  }
}
