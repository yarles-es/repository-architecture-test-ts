import { MongoGetUsersRepository } from "../../../src/repositories/get-users/mongo-get-users";
import { MongoClient } from "../../../src/database/mongo";
import { UserTransformer } from "../../../src/utils/mongo-helpers/mongo-helpers";

jest.mock("../../../src/database/mongo");
jest.mock("../../../src/utils/mongo-helpers/mongo-helpers");

describe("MongoGetUsersRepository Tests", () => {
  let mongoGetUsersRepository: MongoGetUsersRepository;

  const params = {
    firstName: "John",
    lastName: "Doe",
    email: "john100@gmail.com",
    password: "12345678",
  };

  beforeEach(() => {
    mongoGetUsersRepository = new MongoGetUsersRepository();
  });

  test("should return users", async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            {
              _id: "some-id",
              ...params,
            },
          ]),
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

    const users = await mongoGetUsersRepository.getUsers();

    expect(users).toEqual([
      {
        id: "some-id",
        ...params,
      },
    ]);
    expect(mockDb.collection).toHaveBeenCalledWith("users");
    expect(mockDb.collection().find).toHaveBeenCalledWith({});
  });

  test("should return empty array if no users are found", async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([]),
        }),
      }),
    };

    (MongoClient.getDatabase as jest.Mock).mockReturnValue(mockDb);

    const users = await mongoGetUsersRepository.getUsers();

    expect(users).toEqual([]);
    expect(mockDb.collection).toHaveBeenCalledWith("users");
    expect(mockDb.collection().find).toHaveBeenCalledWith({});
  });

  test("should throw error if db throws", async () => {
    const mockDb = {
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockRejectedValue(new Error("Some error")),
        }),
      }),
    };

    (MongoClient.getDatabase as jest.Mock).mockReturnValue(mockDb);

    await expect(mongoGetUsersRepository.getUsers()).rejects.toThrow(
      "Some error"
    );
  });
});