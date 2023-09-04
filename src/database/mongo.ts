import { MongoClient as Mongo, Db } from "mongodb";

export class MongoClient {
  private static client: Mongo | undefined;
  private static db: Db | undefined;

  static async connect(): Promise<void> {
    try {
      const url = process.env.MONGODB_URL || "localhost:27017";
      const username = process.env.MONGODB_USERNAME;
      const password = process.env.MONGODB_PASSWORD;

      if (!this.client) {
        this.client = new Mongo(url, { auth: { username, password } });
        await this.client.connect();
        this.db = this.client.db("users-db");
        console.log("Connected to MongoDB");
      }
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      throw error;
    }
  }

  static getDatabase(): Db {
    if (!this.db) {
      throw new Error("Database not initialized. Did you forget to connect?");
    }
    return this.db;
  }
}