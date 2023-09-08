import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import { UserRoutes } from "./routes/userRoutes";
import { GetUserController } from "./controllers/get-users/get-users";
import { CreateUserController } from "./controllers/create-user/create-user";
import { UpdateUserController } from "./controllers/update-user/update-user";
import { DeleteUserController } from "./controllers/delete-user/delete-user";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { MongoUpdateUserRepository } from "./repositories/update-user/mongo-update-user";
import { MongoDeleteUserRepository } from "./repositories/delete-user/mongo-delete-user";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { UserValidate } from "./middlewares/user-validate/user-validate";

class AppInitializer {
  private app: express.Express;

  constructor() {
    this.app = express();
  }

  private initializeRepositories() {
    const mongoGetUserRepository = new MongoGetUsersRepository();
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();

    return {
      mongoGetUserRepository,
      mongoCreateUserRepository,
      mongoUpdateUserRepository,
      mongoDeleteUserRepository,
    };
  }

  private initializeControllers(
    repos: ReturnType<typeof this.initializeRepositories>
  ) {
    const getUserController = new GetUserController(
      repos.mongoGetUserRepository
    );
    const createUserController = new CreateUserController(
      repos.mongoCreateUserRepository
    );
    const updateUserController = new UpdateUserController(
      repos.mongoUpdateUserRepository
    );
    const deleteUserController = new DeleteUserController(
      repos.mongoDeleteUserRepository
    );

    return {
      getUserController,
      createUserController,
      updateUserController,
      deleteUserController,
    };
  }

  public async initialize() {
    config();

    this.app.use(express.json());
    await MongoClient.connect();

    const repositories = this.initializeRepositories();
    const controllers = this.initializeControllers(repositories);
    const userValidate = new UserValidate();

    const userRoutes = new UserRoutes(
      controllers.getUserController,
      controllers.createUserController,
      controllers.updateUserController,
      controllers.deleteUserController,
      userValidate
    ).router;

    this.app.use(userRoutes);
  }

  public start() {
    const port = process.env.PORT || 8000;
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

const initializer = new AppInitializer();
initializer.initialize();
initializer.start();
