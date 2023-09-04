import { User } from "../../models/user";

export interface IDeteleUserRepository {
  deleteUser(id: string): Promise<User>;
}
