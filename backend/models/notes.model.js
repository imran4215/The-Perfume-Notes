import mongoose from "mongoose";

export const noteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    profilePic: {
      url: String,
      public_id: String,
    },
    coverPic: {
      url: String,
      public_id: String,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
