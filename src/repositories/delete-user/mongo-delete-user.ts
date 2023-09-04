import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { IDeleteUserRepository } from "../../controllers/delete-user/protocols";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const deletedUser = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOneAndDelete({ _id: new ObjectId(id) });

    if (!deletedUser) {
      throw new Error("User not deleted");
    }

    const { _id, ...user } = deletedUser;
    return { id: _id.toHexString(), ...user };
  }
}
