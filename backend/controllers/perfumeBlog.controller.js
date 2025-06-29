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
      category,
      metaTitle,
      metaDescription,
      slug,
    } = req.body;

    const accords = JSON.parse(req.body.accords || "[]");
    const parsedNotes = JSON.parse(notes || "[]");

    // Check required fields only
    if (
      !title ||
      !releaseDate ||
      !brand ||
      !perfumer ||
      !notes ||
      !accords ||
      !description1 ||
      !description2 ||
      !author ||
      !category ||
      !slug ||
      !metaTitle ||
      !metaDescription
    ) {
      // Only delete image if uploaded
      if (public_id1) await deleteImage(public_id1);
      if (public_id2) await deleteImage(public_id2);

      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check for existing blog
    const existing = await PerfumeBlog.findOne({ slug });
    if (existing) {
      if (public_id1) await deleteImage(public_id1);
      if (public_id2) await deleteImage(public_id2);
      return res
        .status(409)
        .json({ message: "A blog with this title or slug already exists." });
    }

    // Prepare blog data
    const newBlogData = {
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
      category,
      metaTitle,
      metaDescription,
      slug,
    };

    // Attach image1 if exists
    if (req.files?.image1?.[0]) {
      newBlogData.image1 = {
        url: req.files.image1[0].path,
        public_id: req.files.image1[0].filename,
      };
    }

    // Attach image2 if exists
    if (req.files?.image2?.[0]) {
      newBlogData.image2 = {
        url: req.files.image2[0].path,
        public_id: req.files.image2[0].filename,
      };
    }

    const newBlog = new PerfumeBlog(newBlogData);
    await newBlog.save();

    res
      .status(201)
      .json({ message: "Perfume Blog added successfully", newBlog });
  } catch (error) {
    if (public_id1) await deleteImage(public_id1);
    if (public_id2) await deleteImage(public_id2);
    console.error("Error in adding perfume Blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const Blogs = await PerfumeBlog.find(
      {},
      "title image1 releaseDate category slug"
    )
      .populate("brand", "name logo slug")
      .populate("perfumer", "name image slug")
      .populate("notes.top", "name slug profilePic")
      .populate("notes.middle", "name slug profilePic")
      .populate("notes.base", "name slug profilePic")
      .populate("author")
      .sort({
        _id: -1,
      });

    res.status(200).json({
      message: "Perfume Blogs fetched successfully",
      Blogs: Blogs,
    });
  } catch (error) {
    console.error("Error in fetching perfume Blogs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single Blog by slug
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await PerfumeBlog.findOne({ slug })
      .populate("brand", "name logo slug")
      .populate("perfumer", "name image slug")
      .populate("notes.top", "name slug profilePic")
      .populate("notes.middle", "name slug profilePic")
      .populate("notes.base", "name slug profilePic")
      .populate("author");

    if (!blog) {
      return res.status(404).json({ message: "Perfume blog not found" });
    }
    res.status(200).json({
      message: "Perfume blog fetched successfully",
      blog,
    });
  } catch (error) {
    console.error("Error in fetching perfume blog by slug:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a Blog
export const updateBlog = async (req, res) => {
  const uploadedImage1 = req.files?.image1?.[0];
  const uploadedImage2 = req.files?.image2?.[0];

  try {
    const { slug: currentSlug } = req.params;
    const existingBlog = await PerfumeBlog.findOne({ slug: currentSlug });

    if (!existingBlog) {
      if (uploadedImage1) await deleteImage(uploadedImage1.filename);
      if (uploadedImage2) await deleteImage(uploadedImage2.filename);
      return res.status(404).json({ message: "Perfume blog not found" });
    }

    const updatedFields = {};

    const editable = [
      "title",
      "subtitle",
      "releaseDate",
      "brand",
      "perfumer",
      "description1",
      "description2",
      "author",
      "category",
      "metaTitle",
      "metaDescription",
    ];

    editable.forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== "")
        updatedFields[key] = req.body[key];
    });

    /* Accords & notes come as JSON strings */
    if (req.body.accords !== undefined) {
      try {
        updatedFields.accords = JSON.parse(req.body.accords);
      } catch {
        return res.status(400).json({ message: "Invalid accords JSON" });
      }
    }
    if (req.body.notes !== undefined) {
      try {
        updatedFields.notes = JSON.parse(req.body.notes);
      } catch {
        return res.status(400).json({ message: "Invalid notes JSON" });
      }
    }

    if (req.body.slug && req.body.slug !== existingBlog.slug) {
      const slugConflict = await PerfumeBlog.findOne({
        slug: req.body.slug,
        _id: { $ne: existingBlog._id },
      });
      if (slugConflict) {
        if (uploadedImage1) await deleteImage(uploadedImage1.filename);
        if (uploadedImage2) await deleteImage(uploadedImage2.filename);
        return res
          .status(409)
          .json({ message: "Another blog with this slug already exists" });
      }
      updatedFields.slug = req.body.slug;
    }

    /* ── Replace images if new ones sent ───────────────── */
    if (uploadedImage1) {
      if (existingBlog.image1?.public_id)
        await cloudinary.uploader.destroy(existingBlog.image1.public_id);
      updatedFields.image1 = {
        url: uploadedImage1.path,
        public_id: uploadedImage1.filename,
      };
    }

    if (uploadedImage2) {
      if (existingBlog.image2?.public_id)
        await cloudinary.uploader.destroy(existingBlog.image2.public_id);
      updatedFields.image2 = {
        url: uploadedImage2.path,
        public_id: uploadedImage2.filename,
      };
    }

    const updatedBlog = await PerfumeBlog.findByIdAndUpdate(
      existingBlog._id,
      { $set: updatedFields },
      { new: true }
    );

    return res.status(200).json({
      message: "Perfume blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    if (uploadedImage1) await deleteImage(uploadedImage1.filename);
    if (uploadedImage2) await deleteImage(uploadedImage2.filename);
    console.error("Error updating perfume blog:", error);
    return res.status(500).json({ message: "Internal server error" });
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
