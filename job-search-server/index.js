import { PrismaClient } from "@prisma/client";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import ApplicationsRouter from "./src/applications/routes/applications.router.js";
import CompaniesRouter from "./src/companies/routes/companies.router.js";
import IndustriesRouter from "./src/industries/routes/industries.router.js";
import JobsRouter from "./src/jobs/routes/jobs.router.js";
import UsersRouter from "./src/users/routes/users.router.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url:
//         process.env.NODE_ENV === "production"
//           ? process.env.CLEARDB_DATABASE_URL
//           : process.env.DATABASE_URL,
//     },
//   },
// });

const prismaClient = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api/users", UsersRouter);
app.use("/api/companies", CompaniesRouter);
app.use("/api/jobs", JobsRouter);
app.use("/api/applications", ApplicationsRouter);
app.use("/api/industries", IndustriesRouter);

app.get("/api", async (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
