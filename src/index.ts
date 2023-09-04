import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUserController } from "./controllers/get-users/get-users";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();
  
  const app = express();

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUserController = new GetUserController(mongoGetUsersRepository);

    const { body, statusCode } = await getUserController.handle();

    res.status(statusCode).json(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

main();
