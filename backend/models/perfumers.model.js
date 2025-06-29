import mongoose from "mongoose";

const perfumerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    intro: {
      type: String,
    },
    bio: {
      type: String,
      required: true,
    },
    image: {
      url: String,
      public_id: String,
    },
    metaTitle: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Perfumer = mongoose.model("Perfumer", perfumerSchema);
export default Perfumer;
