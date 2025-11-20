"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const paymentId = params.get("razorpay_payment_id");
  const orderId = params.get("razorpay_order_id");
  const signature = params.get("razorpay_signature");
  
  return (
    <div className="container py-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: 700 }}>
        <h3 className="mb-3">Payment Successful</h3>
        <p className="mb-1"><strong>Payment ID:</strong> {paymentId}</p>
        <p className="mb-1"><strong>Order ID:</strong> {orderId}</p>
        <p className="mb-1"><strong>Signature:</strong> {signature}</p>
        <p className="mt-3">Thank you for your donation — you can close this page now.</p>
      </div>
    </div>
  );
}
