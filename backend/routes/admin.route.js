import express from "express";
import { getDashboardData } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/getDashboardData", getDashboardData);

export default router;
