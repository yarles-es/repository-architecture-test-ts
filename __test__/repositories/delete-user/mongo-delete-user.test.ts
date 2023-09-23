import { MongoDeleteUserRepository } from "../../../src/repositories/delete-user/mongo-delete-user";
import { MongoClient } from "../../../src/database/mongo";
import { UserTransformer } from "../../../src/utils/mongo-helpers/mongo-helpers";
import { ObjectId } from "mongodb";

jest.mock("../../../src/database/mongo");
jest.mock("../../../src/utils/mongo-helpers/mongo-helpers");
jest.mock("mongodb", () => ({
  ObjectId: jest.fn(() => "some-id"),
}));

describe("MongoDeleteUserRepository Tests", () => {
  let mongoDeleteUserRepository: MongoDeleteUserRepository;

  const id = "some-id";

  const params = {
    firstName: "John",
    lastName: "Doe",
    email: "john100@gmail.com",
    password: "12345678",
  };

  beforeEach(() => {
    mongoDeleteUserRepository = new MongoDeleteUserRepository();
  });

  test("should delete user and return transformed user", async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        findOneAndDelete: jest.fn().mockResolvedValue({
          value: {
            _id: "some-id",
            ...params,
          },
        }),
      }),
    };
    (MongoClient.getDatabase as jest.Mock).mockReturnValue(mockDb);
    (UserTransformer.transformId as jest.Mock).mockReturnValue({
      id,
      ...params,
    });

    const user = await mongoDeleteUserRepository.deleteUser(id);

    expect(user).toEqual({
      id: "some-id",
      ...params,
    });
    expect(mockDb.collection).toHaveBeenCalledWith("users");
    expect(mockDb.collection().findOneAndDelete).toHaveBeenCalledWith({
      _id: new ObjectId(id),
    });
  });

  test("should throw error if user is not deleted", async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        findOneAndDelete: jest.fn().mockResolvedValue(null),
      }),
    };
    (MongoClient.getDatabase as jest.Mock).mockReturnValue(mockDb);

    await expect(mongoDeleteUserRepository.deleteUser(id)).rejects.toThrow(
      "User not deleted"
    );
  });
});
