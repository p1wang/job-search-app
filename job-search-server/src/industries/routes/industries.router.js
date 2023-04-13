import express from "express";
import IndustriesController from "../controllers/industries.controller.js";

const router = express.Router();

router.get("/", IndustriesController.getIndustries);
router.get("/:id", IndustriesController.getIndustry);
router.post("/", IndustriesController.createIndustry);
router.put("/:id", IndustriesController.updateIndustry);

export default router;
