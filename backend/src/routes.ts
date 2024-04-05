import { Application } from "express";
import Users from "./routes/users";
import Notifications from "./routes/notifications";
import Categories from "./routes/categories";

export const routes = (app: Application) => {
  app.use("/users", Users);
  app.use("/notifications", Notifications);
  app.use("/categories", Categories);
};
