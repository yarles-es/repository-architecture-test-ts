import { ObjectId } from "mongodb";

export class UserTransformer {
  static transformId<T extends { _id: ObjectId }>(
    user: T
  ): Omit<T, "_id"> & { id: string } {
    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
