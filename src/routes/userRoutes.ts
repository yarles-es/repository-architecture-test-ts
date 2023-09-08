import { Router, Request, Response } from "express";
import { GetUserController } from "../controllers/get-users/get-users";
import { CreateUserController } from "../controllers/create-user/create-user";
import { UpdateUserController } from "../controllers/update-user/update-user";
import { DeleteUserController } from "../controllers/delete-user/delete-user";
import { UserValidate } from "../middlewares/user-validate/user-validate";

export class UserRoutes {
  public router: Router;
  private getUserController: GetUserController;
  private createUserController: CreateUserController;
  private updateUserController: UpdateUserController;
  private deleteUserController: DeleteUserController;
  private userValidate: UserValidate;

  constructor(
    getUserController: GetUserController,
    createUserController: CreateUserController,
    updateUserController: UpdateUserController,
    deleteUserController: DeleteUserController,
    userValidate: UserValidate
  ) {
    this.router = Router();
    this.getUserController = getUserController;
    this.createUserController = createUserController;
    this.updateUserController = updateUserController;
    this.deleteUserController = deleteUserController;
    this.userValidate = userValidate;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/users", this.getUsers.bind(this));
    this.router.post(
      "/users",
      this.userValidate.validateCreateUser.bind(this.userValidate),
      this.createUser.bind(this)
    );
    this.router.patch(
      "/users/:id",
      this.userValidate.validateUpdateUser.bind(this.userValidate),
      this.updateUser.bind(this)
    );

    this.router.delete(
      "/users/:id",
      this.userValidate.validateDeleteUser.bind(this.userValidate),
      this.deleteUser.bind(this)
    );
  }

  private async getUsers(_req: Request, res: Response) {
    const { body, statusCode } = await this.getUserController.handle();

    res.status(statusCode).json(body);
  }

  private async createUser(req: Request, res: Response) {
    const { body, statusCode } = await this.createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).json(body);
  }

  private async updateUser(req: Request, res: Response) {
    const { body, statusCode } = await this.updateUserController.handle({
      params: req.params,
      body: req.body,
    });

    res.status(statusCode).json(body);
  }

  private async deleteUser(req: Request, res: Response) {
    const { body, statusCode } = await this.deleteUserController.handle({
      params: req.params,
    });

    res.status(statusCode).json(body);
  }
}
