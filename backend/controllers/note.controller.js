import slugify from "slugify";
import Note from "../models/notes.model.js";
import { deleteImage } from "../utils/deleteImage.js";
import cloudinary from "../config/cloudinaryConfig.js";

// Add a new Note
export const addNote = async (req, res) => {
  const public_id1 = req.files?.profilePic?.[0]?.filename;
  const public_id2 = req.files?.coverPic?.[0]?.filename; // May be undefined

  try {
    const { name, category, details, metaTitle, metaDescription } = req.body;

    // profilePic is required, coverPic is optional
    if (
      !name ||
      !category ||
      !details ||
      !metaTitle ||
      !metaDescription ||
      !public_id1
    ) {
      if (public_id1) await deleteImage(public_id1);
      return res.status(400).json({
        message:
          "Name, category, details, metaTitle, metaDescription, and profile picture are required.",
      });
    }

    // Create slug
    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check for duplicate slug
    const existing = await Note.findOne({ slug });
    if (existing) {
      await deleteImage(public_id1);
      if (public_id2) await deleteImage(public_id2);
      return res
        .status(409)
        .json({ message: "A Note with this name already exists." });
    }

    // Build note data
    const newNoteData = {
      name,
      category,
      details,
      metaTitle,
      metaDescription,
      profilePic: {
        url: req.files.profilePic[0].path,
        public_id: public_id1,
      },
      slug,
    };

    // Add coverPic if provided
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
    if (public_id1) await deleteImage(public_id1);
    if (public_id2) await deleteImage(public_id2);
    console.error("Error in adding Note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all Notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({}, "name profilePic slug _id").populate(
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
    const { name, category, details, metaTitle, metaDescription } = req.body;
    const files = req.files;

    // metaTitle and metaDescription required now
    if (!name || !category || !details || !metaTitle || !metaDescription) {
      if (public_id1) await deleteImage(public_id1);
      if (public_id2) await deleteImage(public_id2);
      return res.status(400).json({
        message:
          "Name, category, details, metaTitle and metaDescription are required",
      });
    }

    const existingNote = await Note.findById(id);
    if (!existingNote) {
      if (public_id1) await deleteImage(public_id1);
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
        if (public_id1) await deleteImage(public_id1);
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

    // Update Note fields, including metaTitle and metaDescription
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        name,
        category,
        details,
        metaTitle,
        metaDescription,
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
    if (public_id1) await deleteImage(public_id1);
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
