"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone Number is required"),
  location: yup.string().required("Location is required"),
  availability: yup.array().min(1, "Please select at least one availability option"),
  hoursPerWeek: yup.string().required("Please select your hours per week"),
  interests: yup.array().min(1, "Please select at least one area of interest"),
  motivation: yup.string().required("Please tell us why you want to volunteer"),
  policyAgreement: yup.boolean().oneOf([true], "You must agree to the volunteer policies")
});

export default function VolunteerForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { availability: [], interests: [] }
  });

const onSubmit = async (data) => {
  try {
    const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbyLrJPdUXzRdQ72nEc3tf6kjZYRAOAC3GlEI77HI9VB-ETQmZ9mCE9AyZVR4LlOv2JC/exec";

    fetch(GOOGLE_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...data, formType: "volunteer" })
    });

    const res = await fetch("/api/volunteer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert("Volunteer Application Submitted Successfully!");
      reset();
    }
  } catch (error) {
    console.error("Submission error:", error);
  }
};


  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Volunteer Application</h2>
        <p className="text-muted italic">Apply to contribute your time and skills to support queer and trans community initiatives.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="row g-4 max-w-2xl mx-auto shadow-sm p-4 bg-white rounded border">
        
        <div className="col-12 border-bottom pb-2">
          <h5 className="text-secondary fw-bold uppercase small tracking-wider">Section 1: Personal Information</h5>
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control bg-light" placeholder="Full Name *" {...register("fullName")} />
          <p className="text-danger small">{errors.fullName?.message}</p>
        </div>
        <div className="col-md-6">
          <input type="email" className="form-control bg-light" placeholder="Email Address *" {...register("email")} />
          <p className="text-danger small">{errors.email?.message}</p>
        </div>
        <div className="col-md-6">
          <input type="tel" className="form-control bg-light" placeholder="Phone Number *" {...register("phone")} />
          <p className="text-danger small">{errors.phone?.message}</p>
        </div>
        <div className="col-md-6">
          <input type="number" className="form-control bg-light" placeholder="Age" {...register("age")} />
        </div>
        <div className="col-12">
          <input type="text" className="form-control bg-light" placeholder="Location *" {...register("location")} />
          <p className="text-danger small">{errors.location?.message}</p>
        </div>

        <div className="col-12 border-bottom pb-2 mt-5">
          <h5 className="text-secondary fw-bold uppercase small tracking-wider">Section 2: Availability</h5>
        </div>
        <div className="col-12">
          <label className="small text-muted mb-2">Availability (Check all that apply) *</label>
          <div className="d-flex gap-4">
            {['Weekdays', 'Weekends', 'Flexible'].map((day) => (
              <div key={day} className="form-check">
                <input className="form-check-input" type="checkbox" value={day} {...register("availability")} />
                <label className="form-check-label small">{day}</label>
              </div>
            ))}
          </div>
          <p className="text-danger small">{errors.availability?.message}</p>
        </div>
        <div className="col-md-6">
          <select className="form-select bg-light" {...register("hoursPerWeek")}>
            <option value="">Hours per week *</option>
            <option value="2-5">2-5 hours</option>
            <option value="5-10">5-10 hours</option>
            <option value="10+">10+ hours</option>
          </select>
          <p className="text-danger small">{errors.hoursPerWeek?.message}</p>
        </div>

        <div className="col-12 border-bottom pb-2 mt-5">
          <h5 className="text-secondary fw-bold uppercase small tracking-wider">Section 3: Skills & Interests</h5>
        </div>
        <div className="col-12">
          <label className="small text-muted mb-2">Areas of Interest *</label>
          <div className="row g-2">
            {['Content Writing', 'Social Media', 'Research', 'Event Management', 'Design', 'Field Work'].map((area) => (
              <div key={area} className="col-6">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value={area} {...register("interests")} />
                  <label className="form-check-label small">{area}</label>
                </div>
              </div>
            ))}
          </div>
          <p className="text-danger small">{errors.interests?.message}</p>
        </div>
        <div className="col-12">
          <textarea rows="2" className="form-control bg-light" placeholder="Relevant Skills" {...register("skills")}></textarea>
        </div>
        <div className="col-12">
          <textarea rows="2" className="form-control bg-light" placeholder="Previous Volunteer Experience" {...register("experience")}></textarea>
        </div>

        <div className="col-12 border-bottom pb-2 mt-5">
          <h5 className="text-secondary fw-bold uppercase small tracking-wider">Section 4: Motivation</h5>
        </div>
        <div className="col-12">
          <textarea rows="3" className="form-control bg-light" placeholder="Why do you want to volunteer with us? *" {...register("motivation")}></textarea>
          <p className="text-danger small">{errors.motivation?.message}</p>
        </div>
        <div className="col-12">
          <textarea rows="2" className="form-control bg-light" placeholder="What do you expect to learn?" {...register("expectations")}></textarea>
        </div>

        <div className="col-12 border-bottom pb-2 mt-5">
          <h5 className="text-secondary fw-bold uppercase small tracking-wider">Section 5: Consent</h5>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" {...register("policyAgreement")} />
            <label className="form-check-label small">Agreement to volunteer policies *</label>
            <p className="text-danger small">{errors.policyAgreement?.message}</p>
          </div>
        </div>

        <div className="col-12 text-center mt-4">
          <button className="btn btn-danger px-5 py-2 fw-bold uppercase">Submit Application</button>
        </div>
      </form>
    </div>
  );
}