import express from "express";
import {
  addFeedback,
  deleteFeedback,
  getAllFeedbacks,
} from "../controllers/feedback.controller.js";

const router = express.Router();

router.post("/addFeedback", addFeedback);
router.get("/getAllFeedbacks", getAllFeedbacks);
router.delete("/deleteFeedback/:id", deleteFeedback);

export default router;
