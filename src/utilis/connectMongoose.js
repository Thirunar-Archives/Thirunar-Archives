import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export default async function ConnectMongoose(){
  try {
    if (!MONGODB_URI) {
      console.log("MONGODB_URI is not defined in envirnoment variables");
    }
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB is Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    throw err;
  }
}