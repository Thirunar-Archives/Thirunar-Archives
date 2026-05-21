import ConnectMongoose from "@/utilis/connectMongoose";
import StoryCard from "@/models/StoryCard";
import cloudinary from "@/utilis/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await ConnectMongoose();
    const formData = await req.formData();
    const title = formData.get("title");
    const shortNote = formData.get("shortNote");
    const description = formData.get("description");
    const imageFile = formData.get("image");
    if (!imageFile) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }
    // Convert file → buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // Upload to cloudinary
    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "storycards" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });
    const newStory = await StoryCard.create({
      title,
      shortNote,
      description,
      image: uploadRes.secure_url,
    });
    return NextResponse.json(newStory, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await ConnectMongoose();
    const stories = await StoryCard.find().sort({ createdAt: -1 });
    return NextResponse.json(stories,{ status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}