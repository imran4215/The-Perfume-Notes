import cloudinary from "../config/cloudinaryConfig.js";

export const deleteImage = async (public_id) => {
  if (public_id) {
    try {
      await cloudinary.uploader.destroy(public_id);
    } catch (err) {
      console.error("Failed to delete image from Cloudinary:", err);
    }
  }
};
