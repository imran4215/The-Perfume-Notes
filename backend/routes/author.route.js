import express from "express";
import {
  addAuthor,
  deleteAuthor,
  getAllAuthors,
  updateAuthor,
} from "../controllers/author.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/addAuthor",
  upload.fields([{ name: "authorPic", maxCount: 1 }]),
  addAuthor
);
router.get("/getAllAuthors", getAllAuthors);
router.put(
  "/updateAuthor/:id",
  upload.fields([{ name: "authorPic", maxCount: 1 }]),
  updateAuthor
);
router.delete("/deleteAuthor/:id", deleteAuthor);

export default router;
