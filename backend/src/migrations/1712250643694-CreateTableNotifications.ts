import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableNotifications1712250643694
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notifications",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "message",
            type: "text",
          },
          {
            name: "status",
            type: "boolean",
          },
          {
            name: "type_id",
            type: "int",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "category_id",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_NotificationType.id",
            referencedTableName: "notification_types",
            referencedColumnNames: ["id"],
            columnNames: ["type_id"],
          },
          {
            name: "FK_User.id",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
          },
          {
            name: "FK_Category.id",
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            columnNames: ["category_id"],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notifications");
  }
}
