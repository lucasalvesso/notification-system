import { NotificationsRepository } from "../repository/NotificationsRepository";
import { CategoriesEnum } from "../domain/CategoriesEnum";
import { NotificationsEntity } from "../entity/NotificationsEntity";
import { CategoriesEntity } from "../entity/CategoriesEntity";
import { CategoriesRepository } from "../repository/CategoriesRepository";
import { NotificationTypesEntity } from "../entity/NotificationTypesEntity";
import { UsersEntity } from "../entity/UsersEntity";
import { injectable } from "tsyringe";

@injectable()
export class NotificationsService {
  constructor(
    private notificationsRepository: NotificationsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async getAll(query: Record<string, any>) {
    return await this.notificationsRepository.getAll(query);
  }

  async send(body: ExpectedBody) {
    const errors: string[] = [];

    const usersByCategory = await this.categoriesRepository.getUsersByCategory(
      String(body.category),
    );

    if (!usersByCategory?.users.length) {
      return;
    }

    for (const user of usersByCategory.users) {
      for (const type of user.notificationTypes) {
        const notification = new NotificationsEntity({
          message: body.message,
          category: new CategoriesEntity({
            id: Number(CategoriesEnum[body.category]),
          }),
        });

        notification.type = new NotificationTypesEntity({ id: type.id });
        notification.user = new UsersEntity({ id: user.id });
        notification.status = true;

        try {
          await this.notificationsRepository.save(notification);
        } catch (e) {
          notification.status = false;
          await this.notificationsRepository.save(notification);
          errors.push(
            `notification ${type.name} not sent to user ${user.name}`,
          );
        }
      }
    }

    return errors;
  }
}

interface ExpectedBody {
  message: string;
  category: CategoriesEnum;
}
