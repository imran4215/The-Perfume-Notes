import mongoose from "mongoose";

const perfumeBlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designer",
      required: true,
    },
    perfumer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Perfumer",
      required: true,
    },
    notes: {
      top: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Note",
        },
      ],
      middle: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Note",
        },
      ],
      base: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Note",
        },
      ],
    },
    accords: [
      {
        _id: false,
        name: {
          type: String,
          required: true,
        },
        percentage: {
          type: Number,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
      },
    ],
    description1: {
      type: String,
      required: true,
    },
    description2: {
      type: String,
      required: true,
    },
    image1: {
      url: String,
      public_id: String,
    },
    image2: {
      url: String,
      public_id: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
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

const PerfumeBlog = mongoose.model("PerfumeBlog", perfumeBlogSchema);
export default PerfumeBlog;
