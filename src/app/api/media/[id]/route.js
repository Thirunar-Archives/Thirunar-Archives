import { NextResponse } from "next/server";
import ConnectMongoose from "@/utilis/connectMongoose";
import Media from "@/models/Media";
import { v2 as cloudinary } from "cloudinary";

export async function GET(req, { params }) {
  try {
    await ConnectMongoose();
    const { id } = params;
    const media = await Media.findById(id);
    if (!media)
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: media });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}

export async function PUT(req, context) {
  try {
    await ConnectMongoose();
    const { id } = await context.params;
    const formData = await req.formData();
    const type = formData.get("type");
    const title = formData.get("title");
    const description = formData.get("description");
    const videoUrl = formData.get("videoUrl");
    const imageFile = formData.get("image");
    const videoThumbFile = formData.get("videoThumbnail");
    const media = await Media.findById(id);
    if (!media)
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    let updates = { type, title, description };
    // --- Update PHOTO ---
    if (type === "photo" && imageFile && imageFile.size > 0) {
      if (media.imageUrl) {
        const publicId = media.imageUrl.split("/").pop().split(".")[0];
        cloudinary.uploader.destroy("photo_gallery/" + publicId);
      }
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResponse = await cloudinary.uploader.upload(
        `data:${imageFile.type};base64,${buffer.toString("base64")}`,
        { folder: "photo_gallery" }
      );
      updates.imageUrl = uploadResponse.secure_url;
    }
    // --- Update VIDEO THUMBNAIL ---
    if (type === "video" && videoThumbFile && videoThumbFile.size > 0) {
      if (media.videoThumbnail) {
        const publicId = media.videoThumbnail.split("/").pop().split(".")[0];
        cloudinary.uploader.destroy("video_thumbnails/" + publicId);
      }
      const bytes = await videoThumbFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResponse = await cloudinary.uploader.upload(
        `data:${videoThumbFile.type};base64,${buffer.toString("base64")}`,
        { folder: "video_thumbnails" }
      );
      updates.videoThumbnail = uploadResponse.secure_url;
    }
    // Update YouTube URL (video)
    if (type === "video") {
      updates.videoUrl = videoUrl;
    }
    const updatedMedia = await Media.findByIdAndUpdate(id, updates, { new: true });
    return NextResponse.json({ success: true, data: updatedMedia });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}

export async function DELETE(req, ctx) {
  try {
    const params = await ctx.params;
    await ConnectMongoose();
    const media = await Media.findByIdAndDelete(params.id);
    if (!media)
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    if (media.imageUrl) {
      const publicId = media.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy("photo_gallery/" + publicId);
    }
    if (media.videoThumbnail) {
      const publicId = media.videoThumbnail.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy("video_thumbnails/" + publicId);
    }
    return NextResponse.json({ success: true, message: "Media deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
