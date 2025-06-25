import expreess from "express";
import {
  addNote,
  deleteNote,
  getAllNotes,
  getNoteBySlug,
  updateNote,
} from "../controllers/note.controller.js";
import upload from "../middlewares/multer.js";

const router = expreess.Router();

router.post(
  "/addNote",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "coverPic", maxCount: 1 },
  ]),
  addNote
);

router.get("/getAllNotes", getAllNotes);

router.get("/getNoteBySlug/:slug", getNoteBySlug);

router.put(
  "/updateNote/:id",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "coverPic", maxCount: 1 },
  ]),
  updateNote
);

router.delete("/deleteNote/:id", deleteNote);

export default router;
