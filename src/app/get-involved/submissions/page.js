"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const schema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  location: yup.string().required("Location is required"),
  submissionAs: yup.string().required("Please select your submission type"),
  bio: yup.string().required("Short Bio is required"),
  blogTitle: yup.string().required("Blog Title is required"),
  blogCategory: yup.string().required("Please select a category"),
  blogContent: yup.string().required("Blog content is required"),
  originalWork: yup.string().required("Please confirm if this is your original work"),
  consentPublish: yup.boolean().oneOf([true], "Consent to publish is required")
});

export default function BlogSubmissionForm() {
  const [status, setStatus] = useState("");
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const submissionAs = watch("submissionAs");

  const onSubmit = async (data) => {
    try {
      setStatus("SENDING");
      const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbyLrJPdUXzRdQ72nEc3tf6kjZYRAOAC3GlEI77HI9VB-ETQmZ9mCE9AyZVR4LlOv2JC/exec";

      // 1. SYNC TO GOOGLE SHEETS & ADMIN EMAIL
      fetch(GOOGLE_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...data, formType: "blog" })
      });

      // 2. SYNC TO MONGODB (CLOUD)
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key !== 'blogFile') formData.append(key, data[key]);
      });
      
      if (data.blogFile && data.blogFile[0]) {
        formData.append("blogFile", data.blogFile[0]);
      }

      const res = await fetch("/api/submissions", {
        method: "POST",
        body: formData, 
      });

      if (res.ok) {
        setStatus("SUCCESS");
        alert("Success! Check your Email and Google Sheet.");
        reset();
      } else {
        throw new Error("DB Connection Failed");
      }
    } catch (error) {
      setStatus("ERROR");
      console.error(error);
    }
  };

  return (
    <div className="bg-style py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Blog Submission Form</h2>
          <div className="mx-auto bg-danger" style={{ width: '60px', height: '4px' }}></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="row g-4 max-w-4xl mx-auto shadow-lg p-4 p-md-5 bg-white rounded-4 border">
          
          {/* SECTION 1: BASIC INFORMATION */}
          <div className="col-12 border-bottom pb-2">
            <h5 className="text-danger fw-bold uppercase small tracking-wider">Section 1: Basic Information</h5>
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Full Name *</label>
            <input type="text" className="form-control bg-light" {...register("fullName")} />
            <p className="text-danger small">{errors.fullName?.message}</p>
          </div>
          <div className="col-md-3">
            <label className="form-label small fw-bold">Pronouns</label>
            <input type="text" className="form-control bg-light" {...register("pronouns")} />
          </div>
          <div className="col-md-3">
            <label className="form-label small fw-bold">Gender</label>
            <input type="text" className="form-control bg-light" {...register("gender")} />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Email Address *</label>
            <input type="email" className="form-control bg-light" {...register("email")} />
            <p className="text-danger small">{errors.email?.message}</p>
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold">Location *</label>
            <input type="text" className="form-control bg-light" {...register("location")} />
            <p className="text-danger small">{errors.location?.message}</p>
          </div>

          {/* SECTION 2: AUTHOR DETAILS */}
          <div className="col-12 border-bottom pb-2 mt-4">
            <h5 className="text-danger fw-bold uppercase small tracking-wider">Section 2: Author Details</h5>
          </div>
          <div className="col-12">
            <label className="d-block mb-2 small fw-bold">Are you submitting as: *</label>
            {['Individual', 'Organization'].map((opt) => (
              <div key={opt} className="form-check form-check-inline me-4">
                <input className="form-check-input" type="radio" value={opt} {...register("submissionAs")} id={`sub-${opt}`} />
                <label className="form-check-label" htmlFor={`sub-${opt}`}>{opt}</label>
              </div>
            ))}
            <p className="text-danger small">{errors.submissionAs?.message}</p>
          </div>

          {submissionAs === "Organization" && (
            <div className="col-12">
              <label className="form-label small fw-bold">Organization Name *</label>
              <input type="text" className="form-control bg-light" {...register("orgName")} />
            </div>
          )}

          <div className="col-12">
            <label className="form-label small fw-bold">Short Bio (About the Author) *</label>
            <textarea className="form-control bg-light" rows="3" {...register("bio")}></textarea>
            <p className="text-danger small">{errors.bio?.message}</p>
          </div>

          {/* SECTION 3: BLOG DETAILS */}
          <div className="col-12 border-bottom pb-2 mt-4">
            <h5 className="text-danger fw-bold uppercase small tracking-wider">Section 3: Blog Details</h5>
          </div>
          <div className="col-md-8">
            <label className="form-label small fw-bold">Blog Title *</label>
            <input type="text" className="form-control bg-light" {...register("blogTitle")} />
            <p className="text-danger small">{errors.blogTitle?.message}</p>
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-bold">Blog Category *</label>
            <select className="form-select bg-light" {...register("blogCategory")}>
              <option value="">Select Category</option>
              <option>Gender Politics</option>
              <option>Personal Story</option>
              <option>Policy & Law</option>
              <option>Health & Wellbeing</option>
              <option>Art & Culture</option>
            </select>
            <p className="text-danger small">{errors.blogCategory?.message}</p>
          </div>
          <div className="col-12">
            <label className="form-label small fw-bold">Blog Content *</label>
            <textarea className="form-control bg-light" rows="10" {...register("blogContent")}></textarea>
            <p className="text-danger small">{errors.blogContent?.message}</p>
          </div>
          <div className="col-12">
            <label className="form-label small fw-bold">Attach File (Optional)</label>
            <input type="file" className="form-control bg-light" {...register("blogFile")} />
          </div>

          {/* SECTION 4: CONSENT */}
          <div className="col-12 border-bottom pb-2 mt-4">
            <h5 className="text-danger fw-bold uppercase small tracking-wider">Section 4: Declaration</h5>
          </div>
          <div className="col-md-6">
            <label className="d-block mb-2 small fw-bold">Is this your original work? *</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input className="form-check-input" type="radio" value="Yes" {...register("originalWork")} />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" value="No" {...register("originalWork")} />
                <label className="form-check-label">No</label>
              </div>
            </div>
            <p className="text-danger small">{errors.originalWork?.message}</p>
          </div>

          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" {...register("consentPublish")} id="consentPublish" />
              <label className="form-check-label small fw-bold" htmlFor="consentPublish">
                I consent to publishing this on Thirunar Archives *
              </label>
              <p className="text-danger small">{errors.consentPublish?.message}</p>
            </div>
          </div>

          <div className="col-12 text-center mt-5">
            <button type="submit" className="btn btn-danger px-5 py-3 fw-bold w-100 shadow-sm" disabled={status === "SENDING"}>
              {status === "SENDING" ? "SYNCING TO CLOUD..." : "SUBMIT BLOG FOR REVIEW"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}