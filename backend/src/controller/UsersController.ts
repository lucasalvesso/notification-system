import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { UsersService } from "../service/UsersService";
import { CategoriesEnum } from "../domain/CategoriesEnum";
import { NotificationTypesEnum } from "../domain/NotificationTypesEnum";

@autoInjectable()
export class UsersController {
  constructor(private service: UsersService) {}

  async getAll(req: Request, res: Response) {
    const users = await this.service.getAll();
    res.json(users);
  }

  async save(req: Request, res: Response) {
    const body: Record<string, any> = req.body;

    const errors: string[] = [];

    if (typeof body.name !== "string") {
      errors.push("Invalid field for name");
    }

    if (typeof body.email !== "string") {
      errors.push("Invalid field for email");
    }

    if (typeof body.phoneNumber !== "string") {
      errors.push("Invalid field for phoneNumber");
    }

    if (!Array.isArray(body.categories)) {
      errors.push("Invalid field for categories");
    }

    const categoriesMatched = body.categories?.every(
      (i: CategoriesEnum) => !!CategoriesEnum[i],
    );

    if (!categoriesMatched) {
      errors.push("Invalid values for categories");
    }

    if (!Array.isArray(body.notificationTypes)) {
      errors.push("Invalid field for categories");
    }

    const notificationTypesMatched = body.notificationTypes?.every(
      (i: NotificationTypesEnum) => !!NotificationTypesEnum[i],
    );

    if (!notificationTypesMatched) {
      errors.push("Invalid values for notificationTypes");
    }

    if (errors.length) {
      res.status(400).json(errors);
      return;
    }

    const userData = {
      name: body.name,
      email: body.email,
      phoneNumber: body.phoneNumber,
      categories: body.categories,
      notificationTypes: body.notificationTypes,
    };

    await this.service.save(userData);
    res.status(201).json({ message: "user created successfully" });
  }
}

interface UserQuery {
  name: string;
}
