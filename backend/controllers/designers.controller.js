import slugify from "slugify";
import Designer from "../models/designers.model.js";
import cloudinary from "../config/cloudinaryConfig.js";
import { deleteImage } from "../utils/deleteImage.js";

// Add a new Designer
export const addDesigner = async (req, res) => {
  const public_id = req.files?.logo?.[0]?.filename;
  try {
    const { name, description } = req.body;

    if (!name || !description || !req.files?.logo) {
      await deleteImage(public_id);
      return res.status(400).json({ message: "All fields are required" });
    }

    /// Create Slug from title
    const slug = slugify(name, {
      lower: true,
      strict: true, // Remove special characters
      trim: true,
    });

    // Check if slug already exists
    const existing = await Designer.findOne({ slug });
    if (existing) {
      await deleteImage(public_id);
      return res
        .status(409)
        .json({ message: "A Brand with this name already exists." });
    }

    const newDesigner = new Designer({
      name,
      logo: {
        url: req.files.logo[0].path,
        public_id: req.files.logo[0].filename,
      },
      description,
      slug,
    });

    await newDesigner.save();
    res
      .status(201)
      .json({ message: "Designer added successfully", newDesigner });
  } catch (error) {
    await deleteImage(public_id);
    console.error("Error in adding designer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all Designers
export const getAllDesigners = async (req, res) => {
  try {
    const designers = await Designer.find({}, "name logo slug");

    res.status(200).json({
      message: "Designers fetched successfully",
      designers: designers,
    });
  } catch (error) {
    console.error("Error in fetching designers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Designer by Slug
export const getDesignerBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find designer by slug
    const designer = await Designer.findOne({ slug });
    if (!designer) {
      return res.status(404).json({ message: "Designer not found" });
    }
    res.status(200).json({
      message: "Designer fetched successfully",
      designer: designer,
    });
  } catch (error) {
    console.error("Error in fetching designer by slug:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a Designer
export const updateDesigner = async (req, res) => {
  const public_id = req.files?.logo?.[0]?.filename;
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const files = req.files;

    if (!name || !description) {
      await deleteImage(public_id);
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingDesigner = await Designer.findById(id);
    if (!existingDesigner) {
      await deleteImage(public_id);
      return res.status(404).json({ message: "Designer not found" });
    }

    // Check for slug conflict if name has changed
    let newSlug = existingDesigner.slug;
    if (name !== existingDesigner.name) {
      newSlug = slugify(name, { lower: true, strict: true });
      const existingSlug = await Designer.findOne({
        slug: newSlug,
        _id: { $ne: id },
      });
      if (existingSlug) {
        await deleteImage(public_id);
        return res
          .status(400)
          .json({ message: "Another Designer with this name already exists" });
      }
    }

    // Delete old Cloudinary image if new one is uploaded
    if (files?.logo && existingDesigner.logo?.public_id) {
      await cloudinary.uploader.destroy(existingDesigner.logo.public_id);
    }

    // Update fields
    const updatedDesigner = await Designer.findByIdAndUpdate(
      id,
      {
        name,
        slug: newSlug,
        description,
        logo: files?.logo
          ? {
              url: files.logo[0].path,
              public_id: files.logo[0].filename,
            }
          : existingDesigner.logo,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Designer updated successfully", updatedDesigner });
  } catch (error) {
    await deleteImage(public_id);
    console.error("Error in updating designer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a Designer
export const deleteDesigner = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the designer exists
    const existingDesigner = await Designer.findById(id);
    if (!existingDesigner) {
      return res.status(404).json({ message: "Designer not found" });
    }

    // Delete images from Cloudinary (if public_id exists)
    await deleteImage(existingDesigner.logo?.public_id);

    const deletedDesigner = await Designer.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Designer deleted successfully", deletedDesigner });
  } catch (error) {
    console.error("Error in deleting designer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
