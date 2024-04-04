import { DataSource } from "typeorm";

// const config = {
//   type: "postgres",
//   cli: {
//     entitiesDir: "src/entities",
//     migrationsDir: "src/migrations",
//   },
// };

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "172.19.0.11",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: ["src/entity/*.ts"],
  migrations: ["src/migrations/*.ts"],
});

AppDataSource.initialize();
