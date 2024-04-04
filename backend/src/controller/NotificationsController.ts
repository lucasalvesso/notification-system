import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { CategoriesEnum } from "../domain/CategoriesEnum";
import { NotificationsService } from "../service/NotificationsService";

@autoInjectable()
export class NotificationsController {
  constructor(private service: NotificationsService) {}

  async getAll(req: Request, res: Response) {
    const query: Record<string, any> = req.query;
    const users = await this.service.getAll(query);
    res.json(users);
  }

  async send(req: Request, res: Response) {
    const body: Record<string, any> = req.body;

    const errors: string[] = [];

    if (typeof body.message !== "string") {
      errors.push("Invalid value for message");
    }

    if (!CategoriesEnum[body.category]) {
      errors.push("Invalid value for category");
    }

    if (errors.length) {
      res.status(400).json(errors);
      return;
    }

    const userData = {
      message: body.message,
      category: body.category,
    };

    const result = await this.service.send(userData);

    if (result?.length) {
      res.status(400).json({ errors: result });
      return;
    }

    res.status(200).json({ message: "notifications sent successfully" });
  }
}

interface UserQuery {
  name: string;
}
