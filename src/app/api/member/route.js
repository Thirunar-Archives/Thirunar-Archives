import ConnectMongoose from "@/utilis/connectMongoose";
import Member from "@/models/memberModel";
import cloudinary from "@/utilis/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        await ConnectMongoose();
        const form = await req.formData();

    const name = form.get("name");
    const role = form.get("role");
    const category = form.get("category");
    const bio = form.get("bio");
    const file = form.get("image"); // File object
    let imageUrl = "";
    // Handle Cloudinary upload
    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const base64String = Buffer.from(fileBuffer).toString("base64");

      const uploaded = await cloudinary.uploader.upload(
        `data:${file.type};base64,${base64String}`,
        { folder: "members" }
      );
      imageUrl = uploaded.secure_url;
    }
    const newMember = await Member.create({
      name,
      role,
      category,
      bio,
      image: imageUrl,
    });
        return NextResponse.json(newMember, {status: 201});
    }
    catch(err){
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

export async function GET(req){
    try{
        await ConnectMongoose();
        const members = await Member.find().sort({ createdAt: -1 });
        return NextResponse.json(members, {status: 200});
    }
    catch(err){
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}