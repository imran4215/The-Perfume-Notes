import {
  addPerfumer,
  deletePerfumer,
  getAllPerfumers,
  getPerfumerBySlug,
  updatePerfumer,
} from "../controllers/perfumer.controller.js";
import express from "express";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/addPerfumer",
  upload.fields([{ name: "image", maxCount: 1 }]),
  addPerfumer
);

router.get("/getAllPerfumers", getAllPerfumers);

router.get("/getPerfumerBySlug/:slug", getPerfumerBySlug);

router.put(
  "/updatePerfumer/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updatePerfumer
);

router.delete("/deletePerfumer/:id", deletePerfumer);

export default router;
