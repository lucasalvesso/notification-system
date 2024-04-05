import express from "express";
import { container } from "tsyringe";
import { CategoriesController } from "../controller/CategoriesController";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const controller = container.resolve(CategoriesController);
    await controller.getAll(req, res);
  } catch (e) {
    next();
  }
});

export default router;
