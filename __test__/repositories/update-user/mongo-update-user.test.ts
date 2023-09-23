import { MongoUpdateUserRepository } from "../../../src/repositories/update-user/mongo-update-user";
import { MongoClient } from "../../../src/database/mongo";
import { UserTransformer } from "../../../src/utils/mongo-helpers/mongo-helpers";
import { ObjectId } from "mongodb";

jest.mock("../../../src/database/mongo");
jest.mock("../../../src/utils/mongo-helpers/mongo-helpers");
jest.mock("mongodb", () => ({
  ObjectId: jest.fn(() => "some-id"),
}));

describe("MongoUpdateUserRepository Tests", () => {
  let mongoUpdateUserRepository: MongoUpdateUserRepository;

  const id = "some-id";

  const params = {
    firstName: "John",
    lastName: "Doe",
    email: "john100@gmail.com",
    password: "12345678910",
  };

  beforeEach(() => {
    mongoUpdateUserRepository = new MongoUpdateUserRepository();
  });

  test("should update user and return transformed user", async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        findOneAndUpdate: jest.fn().mockResolvedValue({
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

    const user = await mongoUpdateUserRepository.updateUser(id, params);

    expect(user).toEqual({
      id: "some-id",
      ...params,
    });

    expect(mockDb.collection).toHaveBeenCalledWith("users");
    expect(mockDb.collection().findOneAndUpdate).toHaveBeenCalledWith(
      { _id: new ObjectId(id) },
      { $set: { ...params } },
      { returnDocument: "after" }
    );
  });

  test("should throw error if user is not updated", async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        findOneAndUpdate: jest.fn().mockResolvedValue(null),
      }),
    };

    (MongoClient.getDatabase as jest.Mock).mockReturnValue(mockDb);

    await expect(
      mongoUpdateUserRepository.updateUser(id, params)
    ).rejects.toThrow("User not updated");
  });

  test("should throw error if returned document is not a valid MongoUser", async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        findOneAndUpdate: jest.fn().mockResolvedValue({
          value: {
            _id: "some-id",
            ...params,
            invalidField: "invalid-field",
          },
        }),
      }),
    };

    (MongoClient.getDatabase as jest.Mock).mockReturnValue(mockDb);

    await expect(
      mongoUpdateUserRepository.updateUser(id, params)
    ).rejects.toThrow("Returned document is not a valid MongoUser");
  });
});
