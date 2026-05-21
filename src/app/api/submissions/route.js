import ConnectMongoose from "@/utilis/connectMongoose";
import Submission from "@/models/Submission";
import cloudinary from "@/utilis/cloudinary";
import { NextResponse } from "next/server";

export const maxDuration = 60; 

export async function POST(req) {
  try {
    await ConnectMongoose();
    const formData = await req.formData();
    
    // 1. Handle File Upload to Cloudinary
    const blogFile = formData.get("blogFile");
    let fileUrl = "";

    if (blogFile && blogFile.size > 0) {
      const buffer = Buffer.from(await blogFile.arrayBuffer());
      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "blog_submissions", resource_type: "auto" }, 
          (err, result) => (err ? reject(err) : resolve(result))
        ).end(buffer);
      });
      fileUrl = uploaded.secure_url;
    }

    // 2. Save Data to MongoDB
    const newEntry = await Submission.create({
      name: formData.get("fullName"), 
      email: formData.get("email"),
      formType: "blog",
      message: formData.get("blogTitle"),
      content: {
        location: formData.get("location"),
        bio: formData.get("bio"),
        blogContent: formData.get("blogContent"),
        category: formData.get("blogCategory"),
        submissionAs: formData.get("submissionAs"),
        attachmentUrl: fileUrl, // High-res link from Cloudinary
        originalWork: formData.get("originalWork"),
        pronouns: formData.get("pronouns"),
        gender: formData.get("gender")
      }
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (err) {
    console.error("API ERROR:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET method for Admin Dashboard
export async function GET() {
  try {
    await ConnectMongoose();
    const all = await Submission.find().sort({ createdAt: -1 });
    return NextResponse.json(all, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}