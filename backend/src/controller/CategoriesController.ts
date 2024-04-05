import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { CategoriesService } from "../service/CategoriesService";

@autoInjectable()
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  async getAll(req: Request, res: Response) {
    const data = await this.service.getAll();
    res.json(data);
  }
}
