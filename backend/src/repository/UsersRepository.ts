import { Database } from "./Database";
import { injectable } from "tsyringe";
import { UsersEntity } from "../entity/UsersEntity";

@injectable()
export class UsersRepository {
  constructor(private database: Database) {}

  async getAll(query: Record<string, any>) {
    try {
      const manager = await this.database.getEntityManager();
      return await manager.find<UsersEntity>(UsersEntity, {
        relations: ["categories", "notifications"],
      });
    } catch (e) {
      console.error(e);
      throw new Error("Database error");
    }
  }

  // async getByCategoryName(name: string) {
  //   try {
  //     const manager = await this.database.getEntityManager();
  //     return await manager.find<UsersEntity>(UsersEntity, {
  //       relations: ["categories"],
  //       where: {
  //         categories: { name },
  //       },
  //     });
  //   } catch (e) {
  //     console.error(e);
  //     throw new Error("Database error");
  //   }
  // }

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
