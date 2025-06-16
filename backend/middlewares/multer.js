import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let subFolder = "others";
    if (file.fieldname === "image1" || file.fieldname === "image2")
      subFolder = "blogs";
    else if (file.fieldname === "logo") subFolder = "designers";
    else if (file.fieldname === "image") subFolder = "perfumers";
    else if (file.fieldname === "profilePic") subFolder = "notes/profile";
    else if (file.fieldname === "coverPic") subFolder = "notes/cover";
    else if (file.fieldname === "authorPic") subFolder = "authors";

    return {
      folder: `The Perfume Notes/${subFolder}`,
      allowedFormats: ["jpg", "png", "jpeg", "webp"],
      public_id: Date.now() + "-" + file.originalname.split(".")[0],
      transformation: [{ format: "webp" }],
      format: "webp",
    };
  },
});

const upload = multer({
  storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5, // Limit files to 5MB
  // },
});

export default upload;
