import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/registerAdmin", registerAdmin);
router.post("/loginAdmin", loginAdmin);

export default router;
