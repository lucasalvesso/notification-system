import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ["src/entity/*.ts"],
  migrations: ["src/migrations/*.ts"],
});

AppDataSource.initialize();
