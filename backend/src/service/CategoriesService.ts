import { injectable } from "tsyringe";
import { CategoriesRepository } from "../repository/CategoriesRepository";

@injectable()
export class CategoriesService {
  constructor(private repository: CategoriesRepository) {}

  async getAll() {
    return await this.repository.getAll();
  }
}
