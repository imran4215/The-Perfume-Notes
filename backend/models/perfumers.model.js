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
