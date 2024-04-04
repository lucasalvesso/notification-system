import express from "express";
import { container } from "tsyringe";
import { NotificationsController } from "../controller/NotificationsController";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const controller = container.resolve(NotificationsController);
    await controller.getAll(req, res);
  } catch (e) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    const controller = container.resolve(NotificationsController);
    await controller.send(req, res);
  } catch (e) {
    next();
  }
});

export default router;
