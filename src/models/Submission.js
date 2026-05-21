import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  formType: { type: String, required: true },
  message: String,
  content: { type: Object },
}, { timestamps: true });

// The '||' check prevents the "OverwriteModelError" in Next.js
export default mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema);