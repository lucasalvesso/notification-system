import { DataSource, EntityManager } from "typeorm";
import { injectable } from "tsyringe";

@injectable()
export class Database implements IDatabase {
  constructor(public connection: DataSource) {}

  async getEntityManager(): Promise<EntityManager> {
    return await this.connection.createEntityManager();
  }
}

export interface IDatabase {
  getEntityManager(): Promise<EntityManager>;
}
