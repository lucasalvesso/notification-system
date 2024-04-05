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

    if (typeof body?.name !== "string") {
      errors.push("Invalid value for name");
    }

    if (typeof body?.email !== "string") {
      errors.push("Invalid value for email");
    }

    if (typeof body?.phoneNumber !== "string") {
      errors.push("Invalid value for phoneNumber");
    }

    const validCategories = Object.keys(CategoriesEnum).filter(
      (x) => !(parseInt(x) >= 0),
    );

    if (Array.isArray(body?.categories)) {
      const categoriesMatched = body?.categories?.every((i: string) =>
        validCategories.includes(i),
      );

      if (!categoriesMatched) {
        errors.push("Invalid value for categories");
      }
    } else {
      errors.push("Invalid value for categories");
    }

    const validTypes = Object.keys(NotificationTypesEnum).filter(
      (x) => !(parseInt(x) >= 0),
    );

    if (Array.isArray(body?.notificationTypes)) {
      const notificationTypesMatched = body?.notificationTypes?.every(
        (i: string) => validTypes.includes(i),
      );

      if (!notificationTypesMatched) {
        errors.push("Invalid value for notificationTypes");
      }
    } else {
      errors.push("Invalid value for notificationTypes");
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
