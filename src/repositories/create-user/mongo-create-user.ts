import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controllers/create-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { UserTransformer } from "../../utils/mongo-helpers/mongo-helpers";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const db = MongoClient.getDatabase();

    const { insertedId } = await db.collection("users").insertOne(params);

    const user = await db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) throw new Error("User not created");

    return UserTransformer.transformId(user);
  }
}
