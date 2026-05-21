import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["photo", "video", "publication"],
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    // Photo
    imageUrl: { type: String },
    // Video
    videoUrl: { type: String },
    videoThumbnail: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);