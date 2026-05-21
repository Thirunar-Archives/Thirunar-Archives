import ConnectMongoose from "@/utilis/connectMongoose";
import Event from "@/models/Event";
import cloudinary from "@/utilis/cloudinary";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(req, { params }) {
  try {
    await ConnectMongoose();
    
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid dynamic event ID signature format." }, { status: 400 });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const month = formData.get("month");
    const day = formData.get("date"); 
    const dayTxt = formData.get("dayTxt");
    const location = formData.get("location");
    const content = formData.get("content");
    const imageFile = formData.get("image");

    const existingEvent = await Event.findById(id);
    if (!existingEvent) {
      return NextResponse.json({ error: "Target event document could not be found." }, { status: 404 });
    }

    let imageUrl = existingEvent.image;

    if (imageFile && imageFile.size > 0) {
      console.log("Uploading replacement banner asset to Cloudinary...");
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "events" }, (err, result) => {
          if (err) reject(err);
          resolve(result);
        }).end(buffer);
      });
      imageUrl = uploaded.secure_url;
      console.log("Cloudinary Hot-Swap Success:", imageUrl);
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        month,
        day,
        dayTxt,
        location,
        content,
        image: imageUrl,
      },
      { new: true }
    );

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (err) {
    console.error("CRITICAL UPDATE PUT ERROR:", err);
    return NextResponse.json({ error: "Modification compilation failed: " + err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await ConnectMongoose();
    
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid dynamic event ID signature format." }, { status: 400 });
    }

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json({ error: "Target event document could not be found in cluster." }, { status: 404 });
    }

    return NextResponse.json({ message: "Asset successfully wiped from cloud grid!" }, { status: 200 });
  } catch (err) {
    console.error("CRITICAL DELETE ERROR:", err);
    return NextResponse.json({ error: "Cloud cluster eviction failed: " + err.message }, { status: 500 });
  }
}