import { NextResponse } from "next/server";
import Media from "@/models/Media";
import ConnectMongoose from "@/utilis/connectMongoose";
import cloudinary from "@/utilis/cloudinary";

export async function POST(req) {
  try {
    await ConnectMongoose();
    const formData = await req.formData();
    const type = formData.get("type");
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image"); // photo upload
    const videoThumbnail = formData.get("videoThumbnail"); // thumbnail upload
    const videoUrl = formData.get("videoUrl"); // YouTube URL
    let imageUrl = "";
    let videoThumbnailUrl = "";
    // PHOTO UPLOAD → Cloudinary
    if (type === "photo" && image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "media/photo_uploads",
            },
            (err, result) => (err ? reject(err) : resolve(result))
          )
          .end(buffer);
      });
      imageUrl = uploadResult.secure_url;
    }
    // VIDEO THUMBNAIL UPLOAD → Cloudinary
    if (type === "video" && videoThumbnail) {
      const buffer = Buffer.from(await videoThumbnail.arrayBuffer());
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "media/video_thumbnails",
            },
            (err, result) => (err ? reject(err) : resolve(result))
          )
          .end(buffer);
      });
      videoThumbnailUrl = uploadResult.secure_url;
    }
    // CREATE MEDIA DOCUMENT
    const newMedia = await Media.create({
      type,
      title,
      description,
      imageUrl,
      videoUrl,
      videoThumbnail: videoThumbnailUrl,
    });

    return NextResponse.json(newMedia, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
// GET LIST (FILTER BY TYPE OPTIONAL)
export async function GET(req) {
  try {
    await ConnectMongoose();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const filter = type ? { type } : {};
    const list = await Media.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
