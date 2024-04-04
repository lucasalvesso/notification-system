import "reflect-metadata";
import bodyParser from "body-parser";
import express, { Errback, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { routes } from "./src/routes";
import { createConnection, getConnection } from "typeorm";
import { container } from "tsyringe";
import { Database } from "./src/repository/Database";
import { AppDataSource } from "./ormconfig";

dotenv.config();

const app: express.Application = express();
const port = 3003;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["*"],
  }),
);

app.use(async (req, res, next) => {
  container.register(Database, {
    useValue: new Database(AppDataSource),
  });

  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

routes(app);

app.use(async (req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "internal server error",
    path: req.path,
  });
});

const main = () => {
  app.listen(port, () => {
    console.log("Server listening on port", port);
  });
};

main();
