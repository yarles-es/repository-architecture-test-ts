import { MongoCreateUserRepository } from "../../../src/repositories/create-user/mongo-create-user";
import { MongoClient } from "../../../src/database/mongo";
import { UserTransformer } from "../../../src/utils/mongo-helpers/mongo-helpers";

jest.mock("../../../src/database/mongo");
jest.mock("../../../src/utils/mongo-helpers/mongo-helpers");

describe("MongoCreateUserRepository Tests", () => {
  let mongoCreateUserRepository: MongoCreateUserRepository;

  const params = {
    firstName: "John",
    lastName: "Doe",
    email: "john100@gmail.com",
    password: "12345678",
  };

  beforeEach(() => {
    mongoCreateUserRepository = new MongoCreateUserRepository();
  });

  test("should create user and return transformed user", async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        insertOne: jest.fn().mockResolvedValue({
          insertedId: "some-id",
          ...params,
        }),
        findOne: jest.fn().mockResolvedValue({
          _id: "some-id",
        }),
      }),
    };
    (MongoClient.getDatabase as jest.Mock).mockReturnValue(mockDb);
    (UserTransformer.transformId as jest.Mock).mockImplementation(
      ({ _id, ...rest }) => ({
        id: _id,
        ...rest,
      })
    );

    const user = await mongoCreateUserRepository.createUser(params);

    expect(user.id).toBe("some-id");
    expect(mockDb.collection).toHaveBeenCalledWith("users");
    expect(mockDb.collection().insertOne).toHaveBeenCalledWith(params);
    expect(mockDb.collection().findOne).toHaveBeenCalledWith({
      _id: "some-id",
    });
  });

  test("should throw error if user is not created", async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        insertOne: jest.fn().mockResolvedValue({ insertedId: "some-id" }),
        findOne: jest.fn().mockResolvedValue(null),
      }),
    };
    (MongoClient.getDatabase as jest.Mock).mockReturnValue(mockDb);

    await expect(
      mongoCreateUserRepository.createUser({
        ...params,
      })
    ).rejects.toThrow("User not created");
  });
});
