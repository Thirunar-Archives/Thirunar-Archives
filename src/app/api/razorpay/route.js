// src/app/api/razorpay/route.js
import Razorpay from "razorpay";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const amountINR = Number(body?.amount || 0); // rupees from client
    if (!amountINR || amountINR < 1) {
      return NextResponse.json(
        { error: "Invalid amount" },
        {
          status: 400,
        }
      );
    }
    const amountPaise = Math.round(amountINR * 100); // Razorpay expects paise
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const receiptId = `donation_${Date.now()}_${crypto
      .randomBytes(4)
      .toString("hex")}`;
    const options = {
      amount: amountPaise,
      currency: "INR",
      receipt: receiptId,
      payment_capture: 1, // auto capture
    };
    const order = await razorpay.orders.create(options);
    return NextResponse.json(
      {
        order,
        keyId: process.env.RAZORPAY_KEY_ID, // public key safe to send to client
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    return NextResponse.json(
      { error: "Server error creating order" },
      { status: 500 }
    );
  }
}
