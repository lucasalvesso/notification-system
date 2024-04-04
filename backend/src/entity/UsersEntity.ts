import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { CategoriesEntity } from "./CategoriesEntity";
import { NotificationTypesEntity } from "./NotificationTypesEntity";

@Entity("users")
export class UsersEntity {
  constructor(data: Partial<UsersEntity>) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: "phone_number" })
  phoneNumber: string;

  @ManyToMany(() => CategoriesEntity, (category) => category.users)
  @JoinTable({
    name: "users_categories",
    joinColumn: {
      name: "user_id",
    },
    inverseJoinColumn: {
      name: "category_id",
    },
  })
  categories: CategoriesEntity[];

  @ManyToMany(
    () => NotificationTypesEntity,
    (notification) => notification.users,
  )
  @JoinTable({
    name: "users_notification_types",
    joinColumn: {
      name: "user_id",
    },
    inverseJoinColumn: {
      name: "notification_type_id",
    },
  })
  notificationTypes: NotificationTypesEntity[];
}
