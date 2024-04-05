import { Database } from "./Database";
import { injectable } from "tsyringe";
import { UsersEntity } from "../entity/UsersEntity";

@injectable()
export class UsersRepository {
  constructor(private database: Database) {}

  async getAll() {
    try {
      const manager = await this.database.getEntityManager();
      return await manager.find<UsersEntity>(UsersEntity, {
        relations: ["categories", "notificationTypes"],
      });
    } catch (e) {
      console.error(e);
      throw new Error("Database error");
    }
  }

  async save(entity: UsersEntity) {
    try {
      const manager = await this.database.getEntityManager();
      return await manager.save<UsersEntity>(entity);
    } catch (e) {
      console.error(e);
      throw new Error("Database error");
    }
  }
}
