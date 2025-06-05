import slugify from "slugify";
import PerfumeBlog from "../models/perfumeBlog.model.js";
import cloudinary from "../config/cloudinaryConfig.js";
import { deleteImage } from "../utils/deleteImage.js";

// Add a new Blog
export const addBlog = async (req, res) => {
  const public_id1 = req.files?.image1?.[0]?.filename;
  const public_id2 = req.files?.image2?.[0]?.filename;
  try {
    const {
      title,
      subtitle,
      releaseDate,
      brand,
      perfumer,
      notes,
      description1,
      description2,
      author,
    } = req.body;
    const accords = JSON.parse(req.body.accords);
    const parsedNotes = JSON.parse(notes);

    if (
      !title ||
      !subtitle ||
      !releaseDate ||
      !brand ||
      !perfumer ||
      !notes ||
      !accords ||
      !description1 ||
      !description2 ||
      !author ||
      !req.files?.image1 ||
      !req.files?.image2
    ) {
      await deleteImage(public_id1);
      await deleteImage(public_id2);
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create Slug from title
    const slug = slugify(title, {
      lower: true,
      strict: true, // Remove special characters
      trim: true,
    });

    // Check if slug already exists
    const existing = await PerfumeBlog.findOne({ slug });
    if (existing) {
      await deleteImage(public_id1);
      await deleteImage(public_id2);
      return res
        .status(409)
        .json({ message: "A blog with this title already exists." });
    }

    const newBlog = new PerfumeBlog({
      title,
      subtitle,
      releaseDate,
      brand,
      perfumer,
      notes: parsedNotes,
      accords,
      description1,
      description2,
      author,
      image1: {
        url: req.files.image1[0].path, // Cloudinary URL
        public_id: req.files.image1[0].filename, // Cloudinary public ID
      },
      image2: {
        url: req.files.image2[0].path,
        public_id: req.files.image2[0].filename,
      },
      slug,
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Perfume Blog added successfully", newBlog });
  } catch (error) {
    await deleteImage(public_id1);
    await deleteImage(public_id2);
    console.error("Error in adding perfume Blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const Blogs = await PerfumeBlog.find()
      .populate("brand", "name logo slug")
      .populate("perfumer", "name image slug")
      .populate("notes.top", "name slug profilePic")
      .populate("notes.middle", "name slug profilePic")
      .populate("notes.base", "name slug profilePic")
      .populate("author")
      .sort({ _id: -1 });

    res.status(200).json({
      message: "Perfume Blogs fetched successfully",
      Blogs: Blogs,
    });
  } catch (error) {
    console.error("Error in fetching perfume Blogs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a Blog
export const updateBlog = async (req, res) => {
  const public_id1 = req.files?.image1?.[0]?.filename;
  const public_id2 = req.files?.image2?.[0]?.filename;
  try {
    const { id } = req.params;
    const {
      title,
      subtitle,
      releaseDate,
      brand,
      perfumer,
      notes,
      description1,
      description2,
      author,
    } = req.body;
    const accords = JSON.parse(req.body.accords);
    const parsedNotes = JSON.parse(notes);
    const files = req.files;

    // Required fields check
    if (
      !title ||
      !subtitle ||
      !releaseDate ||
      !brand ||
      !perfumer ||
      !notes ||
      !accords ||
      !description1 ||
      !description2 ||
      !author
    ) {
      await deleteImage(public_id1);
      await deleteImage(public_id2);
      return res
        .status(400)
        .json({ message: "All fields except images are required" });
    }

    const existingBlog = await PerfumeBlog.findById(id);
    if (!existingBlog) {
      await deleteImage(public_id1);
      await deleteImage(public_id2);
      return res.status(404).json({ message: "Perfume blog not found" });
    }

    // Check for slug conflict only if title is changed
    let newSlug = existingBlog.slug;
    if (title !== existingBlog.title) {
      newSlug = slugify(title, { lower: true, strict: true });

      const existingSlug = await PerfumeBlog.findOne({
        slug: newSlug,
        _id: { $ne: id },
      });
      if (existingSlug) {
        await deleteImage(public_id1);
        await deleteImage(public_id2);
        return res
          .status(400)
          .json({ message: "Another blog with this title already exists" });
      }
    }

    // Delete previous images from Cloudinary if new ones are uploaded
    if (files?.image1 && existingBlog.image1?.public_id) {
      await cloudinary.uploader.destroy(existingBlog.image1.public_id);
    }
    if (files?.image2 && existingBlog.image2?.public_id) {
      await cloudinary.uploader.destroy(existingBlog.image2.public_id);
    }

    const updatedImages = {
      image1: files?.image1
        ? {
            url: files.image1[0].path,
            public_id: files.image1[0].filename,
          }
        : existingBlog.image1,

      image2: files?.image2
        ? {
            url: files.image2[0].path,
            public_id: files.image2[0].filename,
          }
        : existingBlog.image2,
    };

    // Update blog
    const updatedBlog = await PerfumeBlog.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        releaseDate,
        brand,
        perfumer,
        notes: parsedNotes,
        accords,
        description1,
        description2,
        author,
        image1: updatedImages.image1,
        image2: updatedImages.image2,
        slug: newSlug,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Perfume Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    await deleteImage(public_id1);
    await deleteImage(public_id2);
    console.error("Error in updating perfume Blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a perfume Blog
export const deleteBlog = async (req, res) => {
  const public_id1 = req.files?.image1?.[0]?.filename;
  const public_id2 = req.files?.image2?.[0]?.filename;
  try {
    const { id } = req.params;

    const blog = await PerfumeBlog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Perfume Blog not found" });
    }

    // Delete images from Cloudinary (if public_id exists)
    await deleteImage(public_id1);
    await deleteImage(public_id2);

    if (blog.image2?.public_id) {
      await cloudinary.uploader.destroy(blog.image2.public_id);
    }

    // Delete blog from DB
    const deletedBlog = await PerfumeBlog.findByIdAndDelete(id);

    res.status(200).json({
      message: "Perfume Blog deleted successfully",
      deletedBlog,
    });
  } catch (error) {
    console.error("Error in deleting perfume Blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
