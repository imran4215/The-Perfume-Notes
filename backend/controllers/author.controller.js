import cloudinary from "../config/cloudinaryConfig.js";
import Author from "../models/author.model.js";
import slugify from "slugify";
import { deleteImage } from "../utils/deleteImage.js";

// Add a new Author
export const addAuthor = async (req, res) => {
  const public_id = req.files?.authorPic?.[0]?.filename;

  try {
    const { name, title, bio, metaTitle, metaDescription } = req.body;

    // Basic required fields validation
    if (!name || !bio || !req.files?.authorPic) {
      await deleteImage(public_id);
      return res
        .status(400)
        .json({ message: "Name, bio, and author picture are required" });
    }

    // Generate slug from name
    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check for duplicate slug
    const existing = await Author.findOne({ slug });
    if (existing) {
      await deleteImage(public_id);
      return res
        .status(409)
        .json({ message: "An author with this name already exists." });
    }

    // Create new author
    const newAuthor = new Author({
      name,
      title, // optional
      bio,
      slug,
      metaTitle: metaTitle?.trim() || "",
      metaDescription: metaDescription?.trim() || "",
      authorPic: {
        url: req.files.authorPic[0].path,
        public_id: req.files.authorPic[0].filename,
      },
    });

    await newAuthor.save();
    res.status(201).json({
      message: "Author added successfully",
      newAuthor,
    });
  } catch (error) {
    await deleteImage(public_id);
    console.error("Error in adding Author:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all Authors
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();

    res.status(200).json({
      message: "Authors fetched successfully",
      authors: authors,
    });
  } catch (error) {
    console.error("Error in fetching Authors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an Author
export const updateAuthor = async (req, res) => {
  const public_id = req.files?.authorPic?.[0]?.filename;

  try {
    const { id } = req.params;
    const { name, title, bio, metaTitle, metaDescription } = req.body;
    const files = req.files;

    // Validate required fields
    if (!name || !bio) {
      await deleteImage(public_id);
      return res.status(400).json({ message: "Name and bio are required" });
    }

    const existingAuthor = await Author.findById(id);
    if (!existingAuthor) {
      await deleteImage(public_id);
      return res.status(404).json({ message: "Author not found" });
    }

    // Handle slug change if name changed
    let newSlug = existingAuthor.slug;
    if (name !== existingAuthor.name) {
      newSlug = slugify(name, { lower: true, strict: true });
      const existingSlug = await Author.findOne({
        slug: newSlug,
        _id: { $ne: id },
      });
      if (existingSlug) {
        await deleteImage(public_id);
        return res
          .status(400)
          .json({ message: "Another Author with this name already exists" });
      }
    }

    // Delete old image if new one uploaded
    if (files?.authorPic && existingAuthor.authorPic?.public_id) {
      await cloudinary.uploader.destroy(existingAuthor.authorPic.public_id);
    }

    // Update author
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      {
        name,
        title,
        bio,
        slug: newSlug,
        metaTitle: metaTitle?.trim() || "",
        metaDescription: metaDescription?.trim() || "",
        authorPic: files?.authorPic
          ? {
              url: files.authorPic[0].path,
              public_id: files.authorPic[0].filename,
            }
          : existingAuthor.authorPic,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Author updated successfully", updatedAuthor });
  } catch (error) {
    await deleteImage(public_id);
    console.error("Error in updating Author:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a Author
export const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the Author exists
    const existingAuthor = await Author.findById(id);
    if (!existingAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    // Delete images from Cloudinary (if public_id exists)
    await deleteImage(existingAuthor.authorPic?.public_id);

    const deletedAuthor = await Author.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Author deleted successfully", deletedAuthor });
  } catch (error) {
    console.error("Error in deleting Author:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
