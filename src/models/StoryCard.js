import mongoose from "mongoose";

const StoryCardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortNote: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.StoryCard ||
  mongoose.model("StoryCard", StoryCardSchema);
