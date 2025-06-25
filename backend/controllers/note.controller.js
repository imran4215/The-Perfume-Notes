import slugify from "slugify";
import Note from "../models/notes.model.js";
import { deleteImage } from "../utils/deleteImage.js";
import cloudinary from "../config/cloudinaryConfig.js";

// Add a new Note
export const addNote = async (req, res) => {
  const public_id1 = req.files?.profilePic?.[0]?.filename;
  const public_id2 = req.files?.coverPic?.[0]?.filename; // May be undefined

  try {
    const { name, category, details } = req.body;

    // profilePic is required, coverPic is optional now
    if (!name || !category || !details || !public_id1) {
      // Delete profilePic if uploaded before error response
      await deleteImage(public_id1);
      return res.status(400).json({
        message: "Name, category, details, and profile picture are required.",
      });
    }

    // Create slug
    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check if slug already exists
    const existing = await Note.findOne({ slug });
    if (existing) {
      await deleteImage(public_id1);
      if (public_id2) await deleteImage(public_id2);
      return res
        .status(409)
        .json({ message: "A Note with this name already exists." });
    }

    // Build newNote object dynamically
    const newNoteData = {
      name,
      category,
      details,
      profilePic: {
        url: req.files.profilePic[0].path,
        public_id: public_id1,
      },
      slug,
    };

    // Only add coverPic if present
    if (req.files.coverPic && req.files.coverPic.length > 0) {
      newNoteData.coverPic = {
        url: req.files.coverPic[0].path,
        public_id: public_id2,
      };
    }

    const newNote = new Note(newNoteData);

    await newNote.save();

    res.status(201).json({ message: "Note added successfully", newNote });
  } catch (error) {
    await deleteImage(public_id1);
    if (public_id2) await deleteImage(public_id2);
    console.error("Error in adding Note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all Notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({}, "name profilePic slug").populate(
      "category",
      "name"
    );

    res.status(200).json({
      message: "Notes fetched successfully",
      notes: notes,
    });
  } catch (error) {
    console.error("Error in fetching Notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Note by slug
export const getNoteBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find Note by slug and populate category
    const note = await Note.findOne({ slug }).populate("category", "name");

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note fetched successfully", note });
  } catch (error) {
    console.error("Error in fetching Note by slug:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a Note
export const updateNote = async (req, res) => {
  const public_id1 = req.files?.profilePic?.[0]?.filename;
  const public_id2 = req.files?.coverPic?.[0]?.filename; // may be undefined

  try {
    const { id } = req.params;
    const { name, category, details } = req.body;
    const files = req.files;

    // coverPic is optional, so not checked here
    if (!name || !category || !details) {
      await deleteImage(public_id1);
      if (public_id2) await deleteImage(public_id2);
      return res
        .status(400)
        .json({ message: "Name, category and details are required" });
    }

    const existingNote = await Note.findById(id);
    if (!existingNote) {
      await deleteImage(public_id1);
      if (public_id2) await deleteImage(public_id2);
      return res.status(404).json({ message: "Note not found" });
    }

    // Slug check if name changed
    let newSlug = existingNote.slug;
    if (name !== existingNote.name) {
      newSlug = slugify(name, { lower: true, strict: true });
      const existingSlug = await Note.findOne({
        slug: newSlug,
        _id: { $ne: id },
      });
      if (existingSlug) {
        await deleteImage(public_id1);
        if (public_id2) await deleteImage(public_id2);
        return res
          .status(400)
          .json({ message: "Another Note with this name already exists" });
      }
    }

    // Delete old Cloudinary images only if new ones uploaded
    if (files?.profilePic && existingNote.profilePic?.public_id) {
      await cloudinary.uploader.destroy(existingNote.profilePic.public_id);
    }
    if (files?.coverPic && existingNote.coverPic?.public_id) {
      await cloudinary.uploader.destroy(existingNote.coverPic.public_id);
    }

    // Update Note fields, conditionally update coverPic only if new uploaded
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        name,
        category,
        details,
        profilePic: files?.profilePic
          ? {
              url: files.profilePic[0].path,
              public_id: files.profilePic[0].filename,
            }
          : existingNote.profilePic,
        coverPic: files?.coverPic
          ? {
              url: files.coverPic[0].path,
              public_id: files.coverPic[0].filename,
            }
          : existingNote.coverPic,
        slug: newSlug,
      },
      { new: true }
    );

    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (error) {
    await deleteImage(public_id1);
    if (public_id2) await deleteImage(public_id2);
    console.error("Error in updating Note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a Note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the Note exists
    const existingNote = await Note.findById(id);
    if (!existingNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Delete images from Cloudinary (if public_id exists)
    await deleteImage(existingNote.profilePic?.public_id);
    await deleteImage(existingNote.coverPic?.public_id);

    const deletedNote = await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully", deletedNote });
  } catch (error) {
    console.error("Error in deleting Note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
