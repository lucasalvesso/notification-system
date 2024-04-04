import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UsersEntity } from "./UsersEntity";

@Entity("categories")
export class CategoriesEntity {
  constructor(data: Partial<CategoriesEntity>) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => UsersEntity, (user) => user.categories)
  @JoinTable({
    name: "users_categories",
    joinColumn: {
      name: "category_id",
    },
    inverseJoinColumn: {
      name: "user_id",
    },
  })
  users: UsersEntity[];
}
