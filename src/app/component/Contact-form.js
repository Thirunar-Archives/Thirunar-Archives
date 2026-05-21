"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required")
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) reset();
  };

  return (
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
        <textarea
          rows="5"
          className="form-control bg-light"
          placeholder="Message"
          {...register("message")}
        ></textarea>
        <p className="text-danger small">{errors.message?.message}</p>
      </div>
      <div className="col-12 text-center">
        <button className="btn btn-danger px-4">SUBMIT</button>
      </div>
    </form>
  );
}