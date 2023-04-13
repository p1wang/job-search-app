import express from "express";
import UsersMiddleware from "../../users/middleware/users.middleware.js";
import ApplicationsController from "../controllers/applications.controller.js";

const router = express.Router();
const { auth } = UsersMiddleware;

router.get("/", ApplicationsController.getApplications);
router.get("/:id", ApplicationsController.getApplication);
router.post("/", auth, ApplicationsController.createApplication);
router.put("/:id", ApplicationsController.updateApplication);

export default router;
