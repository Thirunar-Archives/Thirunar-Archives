import ConnectMongoose from "@/utilis/connectMongoose";
import Submission from "@/models/Submission";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await ConnectMongoose();
    const data = await req.json();

    const newVolunteer = await Submission.create({
      name: data.fullName,
      email: data.email,
      formType: "volunteer",
      message: data.motivation,
      content: data, // Stores all extra fields like phone, interests, etc.
    });

    return NextResponse.json(newVolunteer, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ConnectMongoose();
    const data = await Submission.find({ formType: "volunteer" }).sort({ createdAt: -1 });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}