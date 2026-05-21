import ConnectMongoose from "@/utilis/connectMongoose";
import Blog from "@/models/Blog";
import cloudinary from "@/utilis/cloudinary";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await ConnectMongoose();
    const { id } = await params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
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
    const longNote = formData.get("longNote");
    const imageFiles = [
      formData.get("image1"),
      formData.get("image2"),
      formData.get("image3"),
    ].filter((f) => f && f.name);
    const uploadedImages = [];
    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blog_uploads" },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(buffer);
      });
      uploadedImages.push(uploadResult.secure_url);
    }
    const updateData = {
      title,
      shortNote,
      longNote,
    };
    if (uploadedImages.length > 0) {
      updateData.images = uploadedImages;
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await ConnectMongoose();
    const { id } = await params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}