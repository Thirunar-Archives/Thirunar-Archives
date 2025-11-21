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

  return (
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
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>Title</th>
              <th>Short Note</th>
              <th>Long Note</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((b) => (
              <tr key={b._id}>
                <td>{b.title}</td>
                <td>{b.shortNote}</td>
                <td>{b.longNote.slice(0, 40)}...</td>

                <td>
                  {b.images.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      width={50}
                      height={50}
                      className="rounded me-1"
                      alt="blog image"
                    />
                  ))}
                </td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editBlog(b)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteBlog(b._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
