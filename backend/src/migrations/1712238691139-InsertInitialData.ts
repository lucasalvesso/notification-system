import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInitialData1712238691139 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categories = [
      { id: 1, name: "Sports" },
      { id: 2, name: "Finance" },
      { id: 3, name: "Movies" },
    ];

    for (const category of categories) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(`categories`)
        .values(category)
        .execute();
    }

    const types = [
      { id: 1, name: "SMS" },
      { id: 2, name: "Mail" },
      { id: 3, name: "Push Notification" },
    ];

    for (const type of types) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(`notification_types`)
        .values(type)
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("categories")
      .where("name in ('Sports', 'Finance', 'Movies')")
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("notification_types")
      .where("name in ('SMS', 'Mail', 'Push Notification')")
      .execute();
  }
}
