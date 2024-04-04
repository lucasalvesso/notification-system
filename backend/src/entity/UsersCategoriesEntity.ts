import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UsersEntity } from "./UsersEntity";
import { CategoriesEntity } from "./CategoriesEntity";

@Entity("users_categories")
export class UsersCategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.categories, {
    onDelete: "CASCADE",
    // @ts-ignore
    primary: true,
  })
  @JoinColumn({ name: "user_id" })
  user: UsersEntity;

  @ManyToOne(() => CategoriesEntity, (category) => category.users, {
    onDelete: "CASCADE",
    // @ts-ignore
    primary: true,
  })
  @JoinColumn({ name: "category_id" })
  category: CategoriesEntity;
}
