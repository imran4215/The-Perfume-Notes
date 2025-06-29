import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    bio: {
      type: String,
      required: true,
    },
    authorPic: {
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
    },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);
export default Author;
