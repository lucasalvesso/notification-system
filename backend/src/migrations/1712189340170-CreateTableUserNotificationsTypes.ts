import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUserNotificationsTypes1712189340170
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE users_notification_types (
                user_id INT,
                notification_type_id INT,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (notification_type_id) REFERENCES notification_types(id),
                PRIMARY KEY (user_id, notification_type_id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_notification_types");
  }
}
