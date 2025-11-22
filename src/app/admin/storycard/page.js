"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function StoryCardPage() {
  const [form, setForm] = useState({
    title: "",
    shortNote: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [stories, setStories] = useState([]);

  const [editId, setEditId] = useState(null);

  // Load Bootstrap
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    loadStories();
  }, []);

  // Load list
  async function loadStories() {
    const res = await fetch("/api/storycard");
    const data = await res.json();
    setStories(data);
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // Reset everything
  function resetForm() {
    setForm({ title: "", shortNote: "", description: "" });
    setImage(null);
    setPreview(null);
    setEditId(null);
  }

  // Handle Submit (POST + PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("shortNote", form.shortNote);
    fd.append("description", form.description);
    if (image) fd.append("image", image);

    setLoading(true);

    const url = editId ? `/api/storycard/${editId}` : "/api/storycard";
    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, { method, body: fd });
    const data = await res.json();

    if (!res.ok) setMsg(data.error || "Something went wrong");
    else {
      setMsg(editId ? "Story updated!" : "Story created!");
      resetForm();
      loadStories();
    }

    setLoading(false);
  };

  const handleEdit = (story) => {
    setForm({
      title: story.title,
      shortNote: story.shortNote,
      description: story.description,
    });

    setPreview(story.image);
    setEditId(story._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    const res = await fetch(`/api/storycard/${id}`, { method: "DELETE" });
    await res.json();
    loadStories();
  };

  return (
    <>
      <div className="bg-style">
        <div className="container py-5">
          <h1 className="text-center mb-4">
            {editId ? "Edit Story" : "Add Story"}
          </h1>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <form
                onSubmit={handleSubmit}
                className="border p-4 rounded-4 shadow-sm mb-5"
                encType="multipart/form-data"
              >
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="form-control mb-3"
                  placeholder="Story Title"
                />
                <input
                  name="shortNote"
                  value={form.shortNote}
                  onChange={handleChange}
                  className="form-control mb-3"
                  placeholder="Short Note"
                />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="form-control mb-3"
                  placeholder="Description"
                  rows={3}
                />
                <label className="fw-bold">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="form-control mb-3"
                />
                {preview && (
                  <Image
                    alt=""
                    src={preview}
                    width={300}
                    height={200}
                    className="rounded mb-3"
                  />
                )}
                <button
                  className="btn btn-primary w-100 mt-3"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : editId
                    ? "Update Story"
                    : "Create Story"}
                </button>
                {msg && <p className="mt-3 text-center">{msg}</p>}
              </form>
            </div>
          </div>
          {/* ---------------- Story List ---------------- */}
          <h3 className="text-center mb-3">Stories</h3>
          <div className="row">
            {stories.map((story) => (
              <div className="col-md-4 mb-4" key={story._id}>
                <div className="card shadow-sm rounded-4">
                  <Image
                    src={story.image}
                    width={400}
                    height={250}
                    className="card-img-top"
                    alt=""
                  />
                  <div className="card-body">
                    <h5>{story.title}</h5>
                    <p>{story.shortNote}</p>

                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(story)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(story._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
