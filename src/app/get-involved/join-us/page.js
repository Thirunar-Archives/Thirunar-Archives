"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation Schema based on PDF requirements
const schema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  location: yup.string().required("Location is required"),
  entityType: yup.string().required("Please select your entity type"),
  collaborationType: yup.array().min(1, "Select at least one type of collaboration"),
  proposal: yup.string().required("Proposal description is required"),
  ethicalAgreement: yup.boolean().oneOf([true], "Ethical agreement is required")
});

export default function CollaborationForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { collaborationType: [] }
  });

  const entityType = watch("entityType");

const onSubmit = async (data) => {
  try {
    const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbyLrJPdUXzRdQ72nEc3tf6kjZYRAOAC3GlEI77HI9VB-ETQmZ9mCE9AyZVR4LlOv2JC/exec";

    // Sync to Google (Excel + Email) - Matches the 'Collaboration' tab
    fetch(GOOGLE_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...data, formType: "Collaboration" })
    });

    // Sync to Cloud DB
    const res = await fetch("/api/collaboration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert("Collaboration Proposal Sent!");
      reset();
    }
  } catch (error) {
    console.error("Submission error:", error);
  }
};

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Collaboration Request</h2>
        <p className="text-muted italic">For individuals and organizations interested in partnerships, projects, or collaborations.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="row g-4 max-w-2xl mx-auto shadow-sm p-4 bg-white rounded border">
        
        {/* Section 1: Contact Details */}
        <div className="col-12 border-bottom pb-2">
          <h5 className="text-secondary fw-bold uppercase small tracking-wider">Section 1: Contact Details</h5>
        </div>
        <div className="col-md-8">
          <input type="text" className="form-control bg-light" placeholder="Full Name *" {...register("fullName")} />
          <p className="text-danger small">{errors.fullName?.message}</p>
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control bg-light" placeholder="Pronouns" {...register("pronouns")} />
        </div>
        <div className="col-md-6">
          <input type="email" className="form-control bg-light" placeholder="Email Address *" {...register("email")} />
          <p className="text-danger small">{errors.email?.message}</p>
        </div>
        <div className="col-md-6">
          <input type="tel" className="form-control bg-light" placeholder="Phone Number" {...register("phone")} />
        </div>
        <div className="col-12">
          <input type="text" className="form-control bg-light" placeholder="Location *" {...register("location")} />
          <p className="text-danger small">{errors.location?.message}</p>
        </div>

        {/* Section 2: Collaboration Type */}
        <div className="col-12 border-bottom pb-2 mt-5">
          <h5 className="text-secondary fw-bold uppercase small tracking-wider">Section 2: Collaboration Type</h5>
        </div>
        <div className="col-12 text-center">
          <label className="d-block mb-2">You are: *</label>
          {['Individual', 'NGO', 'Educational Institution', 'Corporate'].map((type) => (
            <div key={type} className="form-check form-check-inline">
              <input className="form-check-input" type="radio" value={type} {...register("entityType")} />
              <label className="form-check-label">{type}</label>
            </div>
          ))}
          <p className="text-danger small">{errors.entityType?.message}</p>
        </div>

        {entityType && entityType !== "Individual" && (
          <div className="col-md-6">
            <input type="text" className="form-control bg-light" placeholder="Organization Name" {...register("orgName")} />
          </div>
        )}
        <div className={entityType && entityType !== "Individual" ? "col-md-6" : "col-12"}>
          <input type="text" className="form-control bg-light" placeholder="Website / Profile Link" {...register("website")} />
        </div>

        {/* Section 3: Proposal Details */}
        <div className="col-12 border-bottom pb-2 mt-5">
          <h5 className="text-secondary fw-bold uppercase small tracking-wider">Section 3: Proposal Details</h5>
        </div>
        <div className="col-12">
          <label className="small text-muted mb-2">Type of Collaboration *</label>
          <div className="row g-2">
            {['Research', 'Events', 'Content Creation', 'Workshops', 'Funding Support', 'Other'].map((item) => (
              <div key={item} className="col-6 col-md-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value={item} {...register("collaborationType")} />
                  <label className="form-check-label small">{item}</label>
                </div>
              </div>
            ))}
          </div>
          <p className="text-danger small">{errors.collaborationType?.message}</p>
        </div>
        <div className="col-12">
          <textarea rows="4" className="form-control bg-light" placeholder="Describe your proposal *" {...register("proposal")}></textarea>
          <p className="text-danger small">{errors.proposal?.message}</p>
        </div>
        <div className="col-12">
          <textarea rows="3" className="form-control bg-light" placeholder="Expected Outcomes" {...register("outcomes")}></textarea>
        </div>

        {/* Section 4: Timeline */}
        <div className="col-12 border-bottom pb-2 mt-5">
          <h5 className="text-secondary fw-bold uppercase small tracking-wider">Section 4: Timeline & Commitment</h5>
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control bg-light" placeholder="Proposed Timeline" {...register("timeline")} />
        </div>
        <div className="col-md-6">
          <select className="form-select bg-light" {...register("involvement")}>
            <option value="">Involvement Level</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Section 5: Declaration */}
        <div className="col-12 border-bottom pb-2 mt-5">
          <h5 className="text-secondary fw-bold uppercase small tracking-wider">Section 5: Final Declaration</h5>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" {...register("ethicalAgreement")} />
            <label className="form-check-label small">Agreement to collaborate ethically *</label>
            <p className="text-danger small">{errors.ethicalAgreement?.message}</p>
          </div>
        </div>

        <div className="col-12 text-center mt-4">
          <button className="btn btn-danger px-5 py-2 fw-bold">SEND REQUEST</button>
        </div>
      </form>
    </div>
  );
}