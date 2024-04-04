import { Application } from "express";
import Users from "./routes/users";
import Notifications from "./routes/notifications";

export const routes = (app: Application) => {
  app.use("/users", Users);
  app.use("/notifications", Notifications);
};
