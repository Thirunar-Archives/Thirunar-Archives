import ConnectMongoose from "@/utilis/connectMongoose";
import Member from "@/models/memberModel";
import cloudinary from "@/utilis/cloudinary";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await ConnectMongoose();
    const { id } = await params;
    const member = await Member.findById(id);
    if (!member)
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    return NextResponse.json(member, { status: 200 });
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
    const form = await req.formData();
    const name = form.get("name");
    const role = form.get("role");
    const category = form.get("category");
    const bio = form.get("bio");
    const file = form.get("image");
    const existing = await Member.findById(id);
    if (!existing) return NextResponse.json({ error: "Not Found" }, { status: 404 });
    let imageUrl = existing.image;
    // Upload new image if file provided
    if (file instanceof File) {
      const fileBuffer = await file.arrayBuffer();
      const base64String = Buffer.from(fileBuffer).toString("base64");
      const uploaded = await cloudinary.uploader.upload(
        `data:${file.type};base64,${base64String}`,
        { folder: "members" }
      );
      imageUrl = uploaded.secure_url;
    }
    const updated = await Member.findByIdAndUpdate(
      id,
      { name, role, category, bio, image: imageUrl },
      { new: true }
    );
    return NextResponse.json(updated, { status: 200 });
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
    await Member.findByIdAndDelete(id);
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
