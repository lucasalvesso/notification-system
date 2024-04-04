import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UsersEntity } from "./UsersEntity";

@Entity("notification_types")
export class NotificationTypesEntity {
  constructor(data: Partial<NotificationTypesEntity>) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => UsersEntity, (user) => user.notificationTypes)
  @JoinTable({
    name: "users_notification_types",
    joinColumn: {
      name: "notification_type_id",
    },
    inverseJoinColumn: {
      name: "user_id",
    },
  })
  users: UsersEntity[];
}
