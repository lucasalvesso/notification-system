import { Database } from "./Database";
import { CategoriesEntity } from "../entity/CategoriesEntity";
import { injectable } from "tsyringe";

@injectable()
export class CategoriesRepository {
  constructor(private database: Database) {}

  async getUsersByCategory(name: string) {
    try {
      const manager = await this.database.getEntityManager();
      return await manager.findOne<CategoriesEntity>(CategoriesEntity, {
        relations: ["users", "users.notificationTypes"],
        where: { name },
        select: ["users"],
      });
    } catch (e) {
      console.error(e);
      throw new Error("Database error");
    }
  }
}
