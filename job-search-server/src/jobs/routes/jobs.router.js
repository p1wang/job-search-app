import express from "express";
import JobsController from "../controllers/jobs.controller.js";
import UsersMiddleware from "../../users/middleware/users.middleware.js";

const router = express.Router();
const { auth } = UsersMiddleware;

router.get("/", JobsController.getJobs);
router.get("/:id", JobsController.getJob);
router.post("/", auth, JobsController.createJob);
router.delete("/:id", JobsController.deleteJob);
router.put("/:id", JobsController.updateJob);

export default router;
