import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      enum: ["Board-Member", "Team-Member"],
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  {
    collection: "members",
    timestamps: true,
  }
);

export default mongoose.models.Member || mongoose.model("Member", MemberSchema);
