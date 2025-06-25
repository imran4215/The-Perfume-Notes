import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
} from "../controllers/perfumeBlog.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/addBlog",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  addBlog
);

router.get("/getAllBlogs", getAllBlogs);

router.get("/getBlogBySlug/:slug", getBlogBySlug);

router.put(
  "/updateBlog/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  updateBlog
);

router.delete("/deleteBlog/:id", deleteBlog);

export default router;
