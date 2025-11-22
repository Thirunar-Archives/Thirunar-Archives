import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortNote: {
      type: String,
      required: true,
    },
    longNote: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);