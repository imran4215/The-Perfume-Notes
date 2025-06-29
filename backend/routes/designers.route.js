import express from "express";
import {
  addDesigner,
  deleteDesigner,
  getAllDesigners,
  getDesignerBySlug,
  updateDesigner,
} from "../controllers/designers.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/addDesigner",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  addDesigner
);

router.get("/getAllDesigners", getAllDesigners);

router.get("/getDesignerBySlug/:slug", getDesignerBySlug);

router.put(
  "/updateDesigner/:slug",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  updateDesigner
);

router.delete("/deleteDesigner/:id", deleteDesigner);

export default router;
