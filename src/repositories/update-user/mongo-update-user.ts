import { ObjectId } from "mongodb";
import {
  IUpdateUserRepository,
  UpdateUserParams,
} from "../../controllers/update-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { UserTransformer } from "../../utils/mongo-helpers/mongo-helpers";

type MongoUser = Omit<User, "id"> & { _id: ObjectId };

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    const db = MongoClient.getDatabase();

    const returnedDoc = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...params } },
        { returnDocument: "after" }
      );

    if (!returnedDoc?.value) {
      throw new Error("User not updated");
    }

    if (!this.isMongoUser(returnedDoc.value)) {
      throw new Error("Returned document is not a valid MongoUser");
    }

    return UserTransformer.transformId(returnedDoc.value);
  }

  private isMongoUser(doc: unknown): doc is MongoUser {
    if (typeof doc !== "object" || doc === null) return false;

    const requiredFields: (keyof MongoUser)[] = [
      "firstName",
      "lastName",
      "email",
      "password",
      "_id",
    ];

    const docKeys = Object.keys(doc);
    return (
      requiredFields.every((field) => field in doc) &&
      docKeys.length === requiredFields.length
    );
  }
}
