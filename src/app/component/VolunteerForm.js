"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  location: yup.string().required("Location is required"),
  message: yup.string().required("Please describe your skills")
});

export default function VolunteerForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbyLrJPdUXzRdQ72nEc3tf6kjZYRAOAC3GlEI77HI9VB-ETQmZ9mCE9AyZVR4LlOv2JC/exec";

      await fetch(GOOGLE_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      alert("Success! Your details have been saved to Google Drive.");
      reset();
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to submit. Please check your internet connection.");
    }
  };

  return (
    <div className="p-4 bg-white shadow-sm rounded border">
      <h4 className="mb-4 fw-bold">Volunteer Application</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control bg-light"
            placeholder="Name"
            {...register("name")}
          />
          <p className="text-danger small">{errors.name?.message}</p>
        </div>
        <div className="col-md-6">
          <input
            type="email"
            className="form-control bg-light"
            placeholder="Email Address"
            {...register("email")}
          />
          <p className="text-danger small">{errors.email?.message}</p>
        </div>
        <div className="col-12">
          <input
            type="text"
            className="form-control bg-light"
            placeholder="Location"
            {...register("location")}
          />
          <p className="text-danger small">{errors.location?.message}</p>
        </div>
        <div className="col-12">
          <textarea
            rows="5"
            className="form-control bg-light"
            placeholder="Your skills / expertise"
            {...register("message")}
          ></textarea>
          <p className="text-danger small">{errors.message?.message}</p>
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-danger px-5 py-2 fw-bold">
            SUBMIT TO CLOUD
          </button>
        </div>
      </form>
    </div>
  );
}