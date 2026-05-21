import ConnectMongoose from "@/utilis/connectMongoose";
import Submission from "@/models/Submission";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await ConnectMongoose();
    const data = await req.json();

    const newCollaboration = await Submission.create({
      name: data.fullName,
      email: data.email,
      formType: "Collaboration",
      message: data.proposal || "New Collaboration Request",
      content: data, // Saves entity name, collab type, etc.
    });

    return NextResponse.json(newCollaboration, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}