import ConnectMongoose from "@/utilis/connectMongoose";
import StoryCard from "@/models/StoryCard";
import cloudinary from "@/utilis/cloudinary";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await ConnectMongoose();
    const { id } = await params;
    const story = await StoryCard.findById(id);
    if (!story) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(story,{ status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await ConnectMongoose();
    const { id } = await params;
    const formData = await req.formData();
    const title = formData.get("title");
    const shortNote = formData.get("shortNote");
    const description = formData.get("description");
    const newImageFile = formData.get("image"); // MAY BE NULL
    const updateData = {
      title,
      shortNote,
      description,
    };
    // If new image is uploaded, replace old
    if (newImageFile && typeof newImageFile === "object") {
      const bytes = await newImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "storycards" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });
      updateData.image = uploadRes.secure_url;
    }
    const updated = await StoryCard.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await ConnectMongoose();
    const { id } = await params;
    const deleted = await StoryCard.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}