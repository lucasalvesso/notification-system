import express from "express";
import { container } from "tsyringe";
import { UsersController } from "../controller/UsersController";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const controller = container.resolve(UsersController);
    await controller.getAll(req, res);
  } catch (e) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    const controller = container.resolve(UsersController);
    await controller.save(req, res);
  } catch (e) {
    next();
  }
});

export default router;
