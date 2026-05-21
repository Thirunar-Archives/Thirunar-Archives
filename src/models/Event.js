import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    month: {
      type: String,
      required: true,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    title: { type: String, required: true },
    day: { type: String, required: true },
    dayTxt: { type: String, required: true },
    location: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);