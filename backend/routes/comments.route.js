import express from "express";
import {
  addComment,
  deleteComment,
  getAllComments,
  getCommentsByBlogId,
} from "../controllers/comments.controller.js";

const router = express.Router();

router.post("/addComment", addComment);
router.get("/getAllComments", getAllComments);
router.get("/getCommentsByBlogId", getCommentsByBlogId);
router.delete("/deleteComment/:id", deleteComment);

export default router;
