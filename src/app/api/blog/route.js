import ConnectMongoose from "@/utilis/connectMongoose";
import Blog from "@/models/Blog";
import cloudinary from "@/utilis/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await ConnectMongoose();

    const formData = await req.formData();
    const title = formData.get("title");
    const shortNote = formData.get("shortNote");
    const longNote = formData.get("longNote");

    const imageFiles = [
      formData.get("image1"),
      formData.get("image2"),
      formData.get("image3")
    ].filter((file) => file && file.size > 0);

    const uploadedImages = [];

    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "blog_uploads" },
          (err, result) => (err ? reject(err) : resolve(result))
        ).end(buffer);
      });

      uploadedImages.push(uploaded.secure_url);
    }

    const blog = await Blog.create({
      title,
      shortNote,
      longNote,
      images: uploadedImages.length > 0 ? uploadedImages : []
    });

    return NextResponse.json(blog, { status: 201 });

  } catch (err) {
    console.error("POST ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ConnectMongoose();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
