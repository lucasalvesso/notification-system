import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialUsers1712280056155 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = [
      {
        id: 1,
        name: "John",
        email: "john@email.com",
        phoneNumber: "559922214422",
        notificationType: 1,
        category: 1,
      },
      {
        id: 2,
        name: "Mike",
        email: "mike@email.com",
        phoneNumber: "885465884454",
        notificationType: 2,
        category: 2,
      },
      {
        id: 3,
        name: "Susan",
        email: "susan@email.com",
        phoneNumber: "218884455454",
        notificationType: 3,
        category: 2,
      },
    ];

    for (const user of users) {
      const { notificationType, category, ...rest } = user;

      await queryRunner.manager.query(`
        INSERT INTO users
            VALUES(${rest.id},'${rest.name}','${rest.email}','${rest.phoneNumber}' )
      `);

      await queryRunner.manager.query(`
        INSERT INTO users_notification_types 
            VALUES(${rest.id},${notificationType})
      `);

      await queryRunner.manager.query(`
        INSERT INTO users_categories 
            VALUES(${rest.id},${category})
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("users_notification_types")
      .where("user_id in (1,2,3)")
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("users_categories")
      .where("user_id in (1,2,3)")
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("users")
      .where("id in (1,2,3)")
      .execute();
  }
}
