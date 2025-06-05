import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    authorPic: {
      url: String,
      public_id: String,
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
