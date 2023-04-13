import express from "express";
import UsersController from "../controllers/users.controller.js";
import UsersMiddleware from "../middleware/users.middleware.js";

const router = express.Router();
const { auth } = UsersMiddleware;

router.get("/", auth, UsersController.getUsers);
router.get("/:id", auth, UsersController.getUser);
router.post("/", auth, UsersController.createUser);
router.put("/:id", auth, UsersController.updateUser);
router.delete("/:id", auth, UsersController.deleteUser);
router.post("/signup", UsersController.signUp);
router.post("/signin", UsersController.signIn);
router.get("/:id/applications", auth, UsersController.getApplicationsByUser);
router.get("/:id/saved-jobs", auth, UsersController.getSavedJobsByUser);
router.post("/:id/saved-jobs", auth, UsersController.saveJob);

export default router;
