import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UsersEntity } from "./UsersEntity";
import { NotificationTypesEntity } from "./NotificationTypesEntity";

@Entity("users_notification_types")
export class UsersNotificationsTypesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.notificationTypes, {
    onDelete: "CASCADE",
    // @ts-ignore
    primary: true,
  })
  @JoinColumn({ name: "user_id" })
  user: UsersEntity;

  @ManyToOne(
    () => NotificationTypesEntity,
    (notification) => notification.users,
    {
      onDelete: "CASCADE",
      // @ts-ignore
      primary: true,
    },
  )
  @JoinColumn({ name: "notification_type_id" })
  notifications: NotificationTypesEntity;
}
