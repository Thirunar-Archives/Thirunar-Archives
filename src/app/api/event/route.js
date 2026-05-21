import ConnectMongoose from "@/utilis/connectMongoose";
import Event from "@/models/Event";
import cloudinary from "@/utilis/cloudinary";
import { NextResponse } from "next/server";

export const maxDuration = 60; 

export async function POST(req) {
  try {
    await ConnectMongoose();
    const formData = await req.formData();
    
    const title = formData.get("title");
    const month = formData.get("month");
    const day = formData.get("date"); 
    const dayTxt = formData.get("dayTxt");
    const location = formData.get("location");
    const content = formData.get("content");
    const imageFile = formData.get("image");
    
    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      console.log("Syncing Image to Cloudinary...");
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "events" }, (err, result) => {
          if (err) reject(err);
          resolve(result);
        }).end(buffer);
      });
      imageUrl = uploaded.secure_url;
    }

    console.log("Storing Data in MongoDB Cluster...");
    const newEvent = await Event.create({
      title, month, day, dayTxt, location, content,
      image: imageUrl,
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (err) {
    console.error("CLOUD ERROR:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ConnectMongoose();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(events, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}