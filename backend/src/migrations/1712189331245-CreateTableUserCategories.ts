import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUserCategories1712189331245
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE users_categories (
                user_id INT,
                category_id INT,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (category_id) REFERENCES categories(id),
                PRIMARY KEY (user_id, category_id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_categories");
  }
}
