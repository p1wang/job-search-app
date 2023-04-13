import express from "express";
import CompaniesController from "../controllers/companies.controller.js";
import UsersMiddleware from "../../users/middleware/users.middleware.js";

const router = express.Router();
const { auth } = UsersMiddleware;

router.get("/", auth, CompaniesController.getCompanies);
router.get("/:id", auth, CompaniesController.getCompany);
router.post("/", auth, CompaniesController.createCompany);
router.put("/:id", auth, CompaniesController.updateCompany);
router.post("/signup", CompaniesController.signUp);
router.get("/:id/job-posts", auth, CompaniesController.getJobPostsByCompany);
router.get(
  "/:companyId/jobs/:jobId/applications",
  auth,
  CompaniesController.getApplicationsByJob
);

export default router;
