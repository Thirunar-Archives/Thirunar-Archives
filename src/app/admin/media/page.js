"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function MediaPage() {
  const [type, setType] = useState("");
  const [filter, setFilter] = useState("photo");
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  // EDIT fields
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    type: "",
    image: null,
    videoThumbnail: null,
  });
  function updateForm(key, value) {
    setForm({ ...form, [key]: value });
  }
  // LOAD MEDIA
  const loadMedia = async (selectedType) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/media?type=${selectedType}`);
      const data = await res.json();
      setMediaList(data.data || []);
    } finally {
      setLoading(false);
    }
  };
  // DELETE
  const deleteMedia = async (id) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/media/${id}`, { method: "DELETE" });
    loadMedia(filter);
  };
  // SUBMIT (CREATE / UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/media/${editId}` : `/api/media`;
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("type", form.type);
    if (form.type === "video") {
      formData.append("videoUrl", form.videoUrl);
    }
    if (form.image) formData.append("image", form.image);
    if (form.videoThumbnail)
      formData.append("videoThumbnail", form.videoThumbnail);
    await fetch(url, { method, body: formData });
    resetForm();
    loadMedia(filter);
  };
  function resetForm() {
    setEditId(null);
    setForm({
      title: "",
      description: "",
      videoUrl: "",
      type: "",
      image: null,
      videoThumbnail: null,
    });
    setType("");
  }
  // EDIT DATA
  function editMedia(item) {
    setEditId(item._id);
    setType(item.type);
    setForm({
      title: item.title,
      description: item.description,
      videoUrl: item.videoUrl || "",
      type: item.type,
      image: null,
      videoThumbnail: null,
    });
  }
  useEffect(() => {
    loadMedia(filter);
  }, [filter]);

  return (
    <div className="bg-style">
      <div className="container py-5">
        <h1 className="mb-5 text-center fw-bold">Admin Media Page</h1>
        {/* FILTER BUTTONS */}
        <div className="text-center mb-4">
          {["photo", "video", "publication"].map((btn) => (
            <button
              key={btn}
              className={`btn btn-sm mx-2 ${
                filter === btn ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => setFilter(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
        {/* FORM */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-6 col-md-8">
            <form
              className="border p-4 rounded-4 shadow-sm"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <label className="fw-bold">Media Type</label>
              <select
                className="form-control mb-3"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  updateForm("type", e.target.value);
                }}
                required
              >
                <option value="">Select Media Type</option>
                <option value="photo">Photo</option>
                <option value="video">Video</option>
                <option value="publication">Publication</option>
              </select>
              <input
                type="text"
                placeholder="Title"
                className="form-control mb-3"
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                className="form-control mb-3"
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                required
              />
              {/* PHOTO */}
              {type === "photo" && (
                <>
                  <label className="fw-bold">Upload Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control mb-3"
                    onChange={(e) => updateForm("image", e.target.files[0])}
                  />
                </>
              )}
              {/* VIDEO */}
              {type === "video" && (
                <>
                  <label className="fw-bold">YouTube URL</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="https://youtube.com/watch?v=123"
                    value={form.videoUrl}
                    onChange={(e) => updateForm("videoUrl", e.target.value)}
                    required
                  />
                  <label className="fw-bold">Thumbnail</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control mb-3"
                    onChange={(e) =>
                      updateForm("videoThumbnail", e.target.files[0])
                    }
                  />
                </>
              )}
              {/* PUBLICATION */}
              {type === "publication" && (
                <p className="text-muted">No file required</p>
              )}

              <button className="btn btn-primary w-100">
                {editId ? "Update Media" : "Create Media"}
              </button>
            </form>
          </div>
        </div>
        {/* LIST */}
        {loading ? (
          <p className="text-center text-muted">Loading...</p>
        ) : mediaList.length === 0 ? (
          <p className="text-center text-muted">No media found.</p>
        ) : (
          <div className="row">
            {mediaList.map((item) => {
              const key = item._id;
              if (item.type === "photo") {
                return (
                  <div key={key} className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        width={500}
                        height={300}
                        alt={item.title}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5>{item.title}</h5>
                        <p className="text-muted">{item.description}</p>
                        <div className="d-flex justify-content-between py-3">
                          <button
                            className="btn btn-primary btn-sm px-3 mt-3"
                            onClick={() => editMedia(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm px-3 mt-3"
                            onClick={() => deleteMedia(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              if (item.type === "video") {
                return (
                  <div key={key} className="col-md-6 mb-4">
                    <div className="ratio ratio-16x9 rounded-4 overflow-hidden border">
                      <iframe
                        src={item.videoUrl}
                        title={item.title}
                        allowFullScreen
                      ></iframe>
                    </div>
                    <p className="mt-2 fw-semibold">{item.title}</p>
                    <p className="text-muted">{item.description}</p>
                    <div className="d-flex justify-content-between py-3">
                      <button
                        className="btn btn-primary btn-sm px-3 mt-3"
                        onClick={() => editMedia(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm px-3 mt-3"
                        onClick={() => deleteMedia(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              }
              return (
                <div key={key} className="col-md-12 mb-4">
                  <ul className="list-group shadow-sm rounded-4 overflow-hidden mb-4">
                    <li className="list-group-item">
                      <strong>{item.title}</strong>
                      <br />
                      <span className="text-muted">{item.description}</span>
                      <div className="d-flex justify-content-between py-3">
                        <button
                          className="btn btn-primary btn-sm px-3 mt-3"
                          onClick={() => editMedia(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm px-3 mt-3"
                          onClick={() => deleteMedia(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}