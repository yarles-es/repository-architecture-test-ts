import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { IDeleteUserRepository } from "../../controllers/delete-user/protocols";
import { UserTransformer } from "../../utils/mongo-helpers/mongo-helpers";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const db = MongoClient.getDatabase();
    const deletedUser = await db
      .collection<Omit<User, "id">>("users")
      .findOneAndDelete({ _id: new ObjectId(id) });

    if (!deletedUser) {
      throw new Error("User not deleted");
    }

     return UserTransformer.transformId(deletedUser);
  }
}
