import express from "express";
import GenericsController from "../controllers/generics.controller.js";

const router = express.Router();

router.get("/", GenericsController.getGenerics);
router.get("/:id", GenericsController.getGeneric);
router.post("/", GenericsController.createGeneric);
router.put("/:id", GenericsController.updateGeneric);

export default router;
