import { UsersRepository } from "../repository/UsersRepository";
import { injectable } from "tsyringe";
import { UsersEntity } from "../entity/UsersEntity";
import { CategoriesEntity } from "../entity/CategoriesEntity";
import { CategoriesEnum } from "../domain/CategoriesEnum";
import { NotificationTypesEnum } from "../domain/NotificationTypesEnum";
import { NotificationTypesEntity } from "../entity/NotificationTypesEntity";

@injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async getAll(query: Record<string, any>) {
    return await this.repository.getAll(query);
  }

  async save(body: ExpectedBody) {
    return await this.repository.save(
      new UsersEntity({
        name: body.name,
        email: body.email,
        phoneNumber: body.phoneNumber,
        categories: body.categories.map(
          (i) => new CategoriesEntity({ id: Number(CategoriesEnum[i]) }),
        ),
        notificationTypes: body.notificationTypes.map(
          (i) =>
            new NotificationTypesEntity({
              id: Number(NotificationTypesEnum[i]),
            }),
        ),
      }),
    );
  }
}

interface ExpectedBody {
  name: string;
  email: string;
  phoneNumber: string;
  categories: CategoriesEnum[];
  notificationTypes: NotificationTypesEnum[];
}
