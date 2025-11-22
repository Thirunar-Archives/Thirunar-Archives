"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState([]);

  const [form, setForm] = useState({
    title: "",
    shortNote: "",
    longNote: "",
    image1: null,
    image2: null,
    image3: null,
  });

  const [editId, setEditId] = useState(null);
  const [existingImages, setExistingImages] = useState([]);

  // Load Blogs Initially
  async function loadBlogs() {
    const res = await fetch("/api/blog");
    const data = await res.json();
    setBlogs(data);
  }

  useEffect(() => {
    async function fetchData() {
      await loadBlogs();
    }
    fetchData();
  }, []);

  // Handle form Update
  function updateForm(key, value) {
    setForm({ ...form, [key]: value });
  }

  // CREATE or UPDATE
  async function submitBlog(e) {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/blog/${editId}` : "/api/blog";

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("shortNote", form.shortNote);
    formData.append("longNote", form.longNote);

    // if updating → send EXISTING images
    if (editId) {
      existingImages.forEach((img) => formData.append("existingImages", img));
    }

    // Only append new uploads if selected
    if (form.image1) formData.append("image1", form.image1);
    if (form.image2) formData.append("image2", form.image2);
    if (form.image3) formData.append("image3", form.image3);

    await fetch(url, { method, body: formData });

    // Reset
    setForm({
      title: "",
      shortNote: "",
      longNote: "",
      image1: null,
      image2: null,
      image3: null,
    });
    setExistingImages([]);
    setEditId(null);

    loadBlogs();
  }

  // EDIT Blog
  function editBlog(blog) {
    setEditId(blog._id);
    setExistingImages(blog.images);

    setForm({
      title: blog.title,
      shortNote: blog.shortNote,
      longNote: blog.longNote,
      image1: null,
      image2: null,
      image3: null,
    });
  }

  // Delete Blog
  async function deleteBlog(id) {
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    loadBlogs();
  }
  useEffect(() => {
    if (!window.bootstrap || blogs.length === 0) return;
    setTimeout(() => {
      document.querySelectorAll(".carousel").forEach((carousel) => {
        try {
          new window.bootstrap.Carousel(carousel, {
            interval: 2000,
            ride: "carousel",
            pause: false,
            wrap: true,
          });
        } catch (e) {
          console.warn("Carousel Init Error:", e);
        }
      });
    }, 200);
  }, [blogs]);

  return (
    <>
      <style>{`
        .carousel-indicators [data-bs-target] {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.6);
        }
        .carousel-indicators .active {
          background-color: #1d4ed8;
        }
        @media (max-width: 768px) {
          .carousel-indicators {
            bottom: -10px;
          }
          .carousel-indicators [data-bs-target] {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>
      <div className="bg-style">
        <div className="container py-5">
          <h1 className="fw-bold mb-4 text-center">Admin - Manage Blogs</h1>
          {/* Blog Form */}
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <form
                onSubmit={submitBlog}
                className="border p-4 rounded-4 shadow-sm mb-5"
                encType="multipart/form-data"
              >
                <input
                  className="form-control mb-3"
                  placeholder="Blog Title"
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                  required
                />
                <textarea
                  className="form-control mb-3"
                  placeholder="Short Note"
                  value={form.shortNote}
                  onChange={(e) => updateForm("shortNote", e.target.value)}
                  required
                />
                <textarea
                  className="form-control mb-3"
                  placeholder="Long Note"
                  value={form.longNote}
                  onChange={(e) => updateForm("longNote", e.target.value)}
                  required
                />
                {/* Existing Images (When Editing) */}
                {editId && (
                  <>
                    <label className="fw-bold">Existing Images</label>
                    <div className="d-flex mb-3">
                      {existingImages.map((img, i) => (
                        <Image
                          key={i}
                          src={img}
                          width={60}
                          height={60}
                          className="rounded me-2 border"
                          alt="existing img"
                        />
                      ))}
                    </div>
                  </>
                )}
                {/* Upload 3 Images */}
                <label className="fw-bold">Upload Images (3 Images)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control mb-2"
                  onChange={(e) => updateForm("image1", e.target.files[0])}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="form-control mb-2"
                  onChange={(e) => updateForm("image2", e.target.files[0])}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="form-control mb-3"
                  onChange={(e) => updateForm("image3", e.target.files[0])}
                />
                <button className="btn btn-primary w-100 mt-3">
                  {editId ? "Update Blog" : "Create Blog"}
                </button>
              </form>
            </div>
          </div>
          {/* Blogs Table */}
          <div className="container py-4">
            <h2 className="fw-bold mb-4 text-center">Manage Blogs</h2>
            <div className="row g-4">
              {blogs.map((blog, index) => (
                <div className="col-lg-4 col-md-6" key={blog._id}>
                  <div className="card shadow-lg border-0 rounded-4 h-100 overflow-hidden">
                    <div
                      id={`admin-carousel-${blog._id}`}
                      className="carousel slide carousel-fade"
                      data-bs-ride="carousel"
                      data-bs-interval="2000"
                      data-bs-touch="true"
                      data-bs-pause="false"
                    >
                      {/* DOT INDICATORS */}
                      <div className="carousel-indicators">
                        {blog.images.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            data-bs-target={`#admin-carousel-${blog._id}`}
                            data-bs-slide-to={i}
                            className={i === 0 ? "active" : ""}
                            aria-current={i === 0 ? "true" : undefined}
                            aria-label={`Slide ${i + 1}`}
                          ></button>
                        ))}
                      </div>
                      <div className="carousel-inner">
                        {blog.images?.map((img, i) => (
                          <div
                            key={i}
                            className={`carousel-item ${
                              i === 0 ? "active" : ""
                            }`}
                          >
                            <Image
                              src={img}
                              width={600}
                              height={350}
                              className="d-block w-100"
                              alt="Blog image"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Body */}
                    <div className="card-body p-3">
                      <h5 className="fw-bold">{blog.title}</h5>
                      <p className="text-muted">{blog.shortNote}</p>
                      <p className="small">{blog.longNote.slice(0, 60)}...</p>
                    </div>
                    {/* ACTION BUTTONS */}
                    <div className="card-footer bg-white border-0 d-flex justify-content-around py-3">
                      <button
                        className="btn btn-primary btn-sm px-3"
                        onClick={() => editBlog(blog)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm px-3"
                        onClick={() => deleteBlog(blog._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}