import Perfumer from "../models/perfumers.model.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinaryConfig.js";
import { deleteImage } from "../utils/deleteImage.js";

// Add a new Perfumer
export const addPerfumer = async (req, res) => {
  const public_id = req.files?.image?.[0]?.filename;
  try {
    const { name, title, intro, bio, metaTitle, metaDescription } = req.body;

    // Check required fields: name, bio, image, metaTitle, metaDescription
    if (!name || !bio || !req.files?.image || !metaTitle || !metaDescription) {
      await deleteImage(public_id);
      return res.status(400).json({
        message:
          "Name, bio, image, metaTitle, and metaDescription are required",
      });
    }

    // Create Slug from name
    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check if slug already exists
    const existing = await Perfumer.findOne({ slug });
    if (existing) {
      await deleteImage(public_id);
      return res
        .status(409)
        .json({ message: "A Perfumer with this name already exists." });
    }

    const newPerfumer = new Perfumer({
      name,
      title, // optional
      intro, // optional
      bio,
      metaTitle,
      metaDescription,
      image: {
        url: req.files.image[0].path,
        public_id: req.files.image[0].filename,
      },
      slug,
    });

    await newPerfumer.save();
    res
      .status(201)
      .json({ message: "Perfumer added successfully", newPerfumer });
  } catch (error) {
    await deleteImage(public_id);
    console.error("Error in adding perfumer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all Perfumers
export const getAllPerfumers = async (req, res) => {
  try {
    const perfumers = await Perfumer.find({}, "name image slug");

    res.status(200).json({
      message: "Perfumers fetched successfully",
      perfumers: perfumers,
    });
  } catch (error) {
    console.error("Error in fetching perfumer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Perfumer by Slug
export const getPerfumerBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const perfumer = await Perfumer.findOne({ slug });
    if (!perfumer) {
      return res.status(404).json({ message: "Perfumer not found" });
    }
    res.status(200).json({
      message: "Perfumer fetched successfully",
      perfumer: perfumer,
    });
  } catch (error) {
    console.error("Error in fetching perfumer by slug:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a Perfumer
export const updatePerfumer = async (req, res) => {
  const public_id = req.files?.image?.[0]?.filename;
  try {
    const { id } = req.params;
    const { name, title, intro, bio, metaTitle, metaDescription } = req.body;
    const files = req.files;

    // Validate required fields: name, bio, metaTitle, metaDescription
    if (!name || !bio || !metaTitle || !metaDescription) {
      await deleteImage(public_id);
      return res.status(400).json({
        message: "Name, bio, metaTitle, and metaDescription are required",
      });
    }

    const existingPerfumer = await Perfumer.findById(id);
    if (!existingPerfumer) {
      await deleteImage(public_id);
      return res.status(404).json({ message: "Perfumer not found" });
    }

    // Check for slug conflict if name changed
    let newSlug = existingPerfumer.slug;
    if (name !== existingPerfumer.name) {
      newSlug = slugify(name, { lower: true, strict: true, trim: true });
      const existingSlug = await Perfumer.findOne({
        slug: newSlug,
        _id: { $ne: id },
      });
      if (existingSlug) {
        await deleteImage(public_id);
        return res
          .status(400)
          .json({ message: "Another Perfumer with this name already exists" });
      }
    }

    // Delete old Cloudinary image if new image uploaded
    if (files?.image && existingPerfumer.image?.public_id) {
      await cloudinary.uploader.destroy(existingPerfumer.image.public_id);
    }

    // Update fields, keep old values if optional fields are not provided
    const updatedPerfumer = await Perfumer.findByIdAndUpdate(
      id,
      {
        name,
        title: title !== undefined ? title : existingPerfumer.title,
        intro: intro !== undefined ? intro : existingPerfumer.intro,
        bio,
        metaTitle,
        metaDescription,
        image: files?.image
          ? {
              url: files.image[0].path,
              public_id: files.image[0].filename,
            }
          : existingPerfumer.image,
        slug: newSlug,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Perfumer updated successfully", updatedPerfumer });
  } catch (error) {
    await deleteImage(public_id);
    console.error("Error in updating perfumer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a Perfumer
export const deletePerfumer = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the perfumer exists
    const existingPerfumer = await Perfumer.findById(id);
    if (!existingPerfumer) {
      return res.status(404).json({ message: "Perfumer not found" });
    }

    // Delete images from Cloudinary (if public_id exists)
    await deleteImage(existingPerfumer.image?.public_id);

    const deletedPerfumer = await Perfumer.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Perfumer deleted successfully", deletedPerfumer });
  } catch (error) {
    console.error("Error in deleting perfumer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
