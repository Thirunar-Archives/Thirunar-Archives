import ConnectMongoose from "@/utilis/connectMongoose";
import Event from "@/models/Event";
import cloudinary from "@/utilis/cloudinary";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await ConnectMongoose();
    const { id } = await params;
    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(event, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await ConnectMongoose();
    const { id } = await params;
    const formData = await req.formData();
    const updateData = {
      title: formData.get("title"),
      month: formData.get("month"),
      day: formData.get("date"),
      dayTxt: formData.get("dayTxt"),
      location: formData.get("location"),
      content: formData.get("content"),
    };
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "events" }, (err, result) => {
            if (err) reject(err);
            resolve(result);
          })
          .end(buffer);
      });
      updateData.image = uploaded.secure_url;
    }
    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await ConnectMongoose();
    const { id } = await params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Deleted Successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
