import mongoose from "mongoose";

const designerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      url: String,
      public_id: String,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Designer = mongoose.model("Designer", designerSchema);
export default Designer;
