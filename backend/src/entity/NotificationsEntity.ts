import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { CategoriesEntity } from "./CategoriesEntity";
import { NotificationTypesEntity } from "./NotificationTypesEntity";
import { UsersEntity } from "./UsersEntity";

@Entity("notifications")
export class NotificationsEntity {
  constructor(data: Partial<NotificationsEntity>) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  status: boolean;

  @Column({ name: "created_at" })
  createdAt: string;

  @OneToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: UsersEntity;

  @Column({ name: "user_id" })
  userId: number;

  @OneToOne(() => CategoriesEntity, (category) => category.id)
  @JoinColumn({ name: "category_id" })
  category: CategoriesEntity;

  @Column({ name: "category_id" })
  categoryId: number;

  @OneToOne(() => NotificationTypesEntity, (type) => type.id)
  @JoinColumn({ name: "type_id" })
  type: NotificationTypesEntity;

  @Column({ name: "type_id" })
  typeId: number;
}
