import { Database } from "./Database";
import { NotificationsEntity } from "../entity/NotificationsEntity";
import { injectable } from "tsyringe";

@injectable()
export class NotificationsRepository {
  constructor(private database: Database) {}

  async getAll(query: Record<string, any>) {
    try {
      const manager = await this.database.getEntityManager();
      return await manager.find<NotificationsEntity>(NotificationsEntity, {
        relations: ["user", "type", "category"],
        order: {
          createdAt: "DESC",
        },
      });
    } catch (e) {
      console.error(e);
      throw new Error("Database error");
    }
  }

  async save(entity: NotificationsEntity) {
    try {
      const manager = await this.database.getEntityManager();
      return await manager.save<NotificationsEntity>(entity);
    } catch (e) {
      console.error(e);
      throw new Error("Database error");
    }
  }
}
