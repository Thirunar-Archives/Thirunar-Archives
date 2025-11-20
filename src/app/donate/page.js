"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Donate() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // fixed options (in INR)
  const fixedAmounts = [100, 250, 500, 1000];
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Razorpay SDK failed to load."));
      document.body.appendChild(script);
    });
  };
  const startPayment = async (amountINR) => {
    setErrorMsg("");
    if (!amountINR || Number(amountINR) <= 0) {
      setErrorMsg("Enter a valid amount (minimum ₹1).");
      return;
    }
    setLoading(true);
    try {
      await loadRazorpayScript();
      // create order on server
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amountINR) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.error || "Could not create order");
        setLoading(false);
        return;
      }
      const { order, keyId } = data;
      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Your Organization",
        description: "Donation",
        order_id: order.id,
        handler: function (response) {
          // On successful payment, go to success page with payment details
          // You can also verify server-side using payment id + signature
          const query = new URLSearchParams({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }).toString();
          window.location.href = `/donation/success?${query}`;
        },
        modal: {
          ondismiss: function () {},
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#00A8C6",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setErrorMsg("Payment failed to start. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-style">
        {/* payment-section */}
        <div className=" container py-4">
          <div className="row g-6">
            {/* UPI CARD */}
            <div className="col-md-4">
              <div className="card p-3 shadow border-0 rounded-4 bg-white-smoke text-dark">
                <div className="text-center mb-3">
                  <i className="fas fa-qrcode blue-icon"></i>
                </div>
                <h4 className="fw-bold text-center">UPI</h4>
                <p>Make UPI donations through GPay, BHIM & other apps.</p>
                <button
                  className="btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#upiModal"
                >
                  UPI Details →
                </button>
              </div>
            </div>
            {/* BANK CARD */}
            <div className="col-md-4">
              <div className="card p-3 shadow border-0 rounded-4 bg-white-smoke text-dark">
                <div className="text-center mb-3">
                  <i className="fas fa-landmark blue-icon"></i>
                </div>
                <h4 className="fw-bold text-center">Bank Transfer</h4>
                <p>
                  Make Donations through Bank <br /> Transfer.
                </p>
                <button
                  className="btn-danger "
                  data-bs-toggle="modal"
                  data-bs-target="#bankModal"
                >
                  Bank Details →
                </button>
              </div>
            </div>
            {/* RAZORPAY CARD */}
            <div className="col-md-4">
              <div className="card p-3 shadow border-0 rounded-4 bg-white-smoke text-dark">
                <div className="text-center mb-3">
                  <i className="fas fa-credit-card blue-icon"></i>
                </div>
                <h4 className="fw-bold text-center">RazorPay</h4>
                <p>Make a donation using RazorPay&apos;s credit/debit cards.</p>
                <button
                  className="btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#razorModal"
                >
                  Donate Now →
                </button>
              </div>
            </div>
          </div>
          {/* ---------------- MODALS ---------------- */}
          {/* UPI MODAL */}
          <div className="modal fade" id="upiModal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-0">
                {/* Header */}
                <div
                  className="modal-header"
                  style={{
                    background: "#e63946", // same color as bank modal screenshot
                    color: "white",
                    justifyContent: "center",
                    borderBottom: "none",
                    padding: "20px",
                  }}
                >
                  <h4 className="modal-title text-center m-0">
                    UPI Information
                  </h4>
                  <button
                    className="btn-close position-absolute end-0 me-3"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                {/* Body */}
                <div className="modal-body p-0">
                  {/* QR Code Row */}
                  <div className="text-center p-3 border-bottom">
                    <Image
                      src="/img/hero-1.png"
                      alt="UPI QR Code"
                      width={400}
                      height={550}
                      className="rounded-4"
                    />
                  </div>
                  {/* Account Holder */}
                  <div className="d-flex justify-content-between p-3 border-bottom">
                    <strong>Account Holder</strong>
                    <span style={{ color: "#1d4ed8" }}>Agni Pradeep</span>
                  </div>
                  {/* Mobile Number */}
                  <div className="d-flex justify-content-between p-3 border-bottom">
                    <strong>Mobile Number</strong>
                    <span style={{ color: "#1d4ed8" }}>9876543210</span>
                  </div>
                  {/* UPI ID */}
                  <div className="d-flex justify-content-between p-3">
                    <strong>UPI ID</strong>
                    <span style={{ color: "#1d4ed8" }}>example@upi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* BANK MODAL */}
          <div className="modal fade" id="bankModal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-0">
                {/* Header */}
                <div
                  className="modal-header"
                  style={{
                    background: "#e63946",
                    color: "white",
                    justifyContent: "center",
                    borderBottom: "none",
                    padding: "20px",
                  }}
                >
                  <h4 className="modal-title text-center m-0">
                    Bank Account <br /> Information
                  </h4>
                  <button
                    className="btn-close position-absolute end-0 me-3"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                {/* Body */}
                <div className="modal-body p-0">
                  {/* Row */}
                  <div className="d-flex justify-content-between p-3 border-bottom">
                    <strong>Account Name</strong>
                    <span style={{ color: "#1d4ed8", textAlign: "right" }}>
                      Thirunar Archives
                    </span>
                  </div>
                  {/* Row */}
                  <div className="d-flex justify-content-between p-3 border-bottom">
                    <strong>Account Number</strong>
                    <span style={{ color: "#1d4ed8" }}>5010071598403</span>
                  </div>
                  {/* Row */}
                  <div className="d-flex justify-content-between p-3 border-bottom">
                    <strong>Account Type</strong>
                    <span style={{ color: "#1d4ed8", textAlign: "right" }}>
                      Saving,
                      <br /> HDFC Bank
                    </span>
                  </div>
                  {/* Row */}
                  <div className="d-flex justify-content-between p-3">
                    <strong>IFSC Code</strong>
                    <span style={{ color: "#1d4ed8" }}>HDFC0008825</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* RAZORPAY MODAL */}
          <div className="modal fade" id="razorModal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-0">
                {/* Header - same style as bank/upi modals */}
                <div
                  className="modal-header"
                  style={{
                    background: "#e63946",
                    color: "white",
                    justifyContent: "center",
                    borderBottom: "none",
                    padding: "20px",
                    position: "relative",
                  }}
                >
                  <h4 className="modal-title text-center m-0">
                    Donate via RazorPay
                  </h4>
                  <button
                    className="btn-close position-absolute end-0 me-3"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body p-0">
                  {/* Optional illustration row (uses your uploaded screenshot path) */}
                  <div className="text-center p-3 border-bottom">
                    <Image
                      src="/img/thirunar-black.png"
                      alt="Donate"
                      width={200}
                      height={200}
                      className="rounded-4"
                      priority
                    />
                  </div>
                  {/* Purpose */}
                  <div className="d-flex justify-content-between p-3 border-bottom">
                    <strong>Purpose</strong>
                    <span style={{ color: "#1d4ed8", textAlign: "right" }}>
                      Donations / Support
                    </span>
                  </div>
                  {/* Fixed amounts */}
                  <div className="p-3 border-bottom">
                    <strong>Choose Amount</strong>
                    <div className="d-flex gap-2 flex-wrap mt-2">
                      {fixedAmounts.map((amt) => (
                        <button
                          key={amt}
                          className="btn btn-outline-primary"
                          onClick={() => startPayment(amt)}
                          disabled={loading}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Custom amount */}
                  <div className="d-flex justify-content-between p-3 border-bottom align-items-center">
                    <strong>Custom Amount</strong>
                    <div style={{ width: "50%", textAlign: "right" }}>
                      <input
                        type="number"
                        min="1"
                        className="form-control"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{
                          display: "inline-block",
                          width: "65%",
                          marginRight: "8px",
                        }}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() => startPayment(amount)}
                        disabled={loading}
                      >
                        Pay
                      </button>
                    </div>
                  </div>
                  {/* Info rows */}
                  <div className="d-flex justify-content-between p-3 border-bottom">
                    <strong>Payment Gateway</strong>
                    <span style={{ color: "#1d4ed8" }}>RazorPay</span>
                  </div>
                  <div className="text-center p-4">
                    <small className="text-muted d-block mb-2">
                      You will be redirected to Razorpay checkout to complete
                      the payment.
                    </small>
                    {errorMsg && (
                      <div className="text-danger mb-2">{errorMsg}</div>
                    )}
                    <button
                      className="donate-btn"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 2-card-section */}
        <div className="container py-5">
          <div className="row align-items-center g-4">
            {/* LEFT IMAGE */}
            <div className="col-md-6">
              <div className="p-2 rounded-4">
                <Image
                  href="/"
                  src="/img/hero-1.png"
                  alt="Thirunar Archives Logo"
                  width={700}
                  height={400}
                  className="img-fluid rounded-4"
                />
              </div>
            </div>
            {/* RIGHT CONTENT */}
            <div className="col-md-6">
              <h2 className="fw-bold mb-3 text-center">
                Why your support is vital?
              </h2>
              <p className="fs-5">
                We rely entirely on voluntary donations to fund our Queer
                advocacy projects. Your gift of any amount will help and support
                our Foundation&apos;s Queer empowerment projects.
              </p>
              <p className="mt-4 fs-5">
                If you need more information write an email to us:
                <br />
                <strong>Thirunararchives.org</strong> or call
                <strong> (+91) 9876543210</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
