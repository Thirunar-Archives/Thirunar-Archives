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
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [stories, setStories] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    loadStories();
  }, []);

  async function loadStories() {
    try {
      const res = await fetch("/api/storycard");
      const data = await res.json();
      setStories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading cards:", err);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  function resetForm() {
    setForm({ title: "", shortNote: "", description: "" });
    setImage(null);
    setPreview(null);
    setEditId(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("shortNote", form.shortNote);
    fd.append("description", form.description);
    if (image) fd.append("image", image);

    setLoading(true);
    setMsg({ text: "", type: "" });

    const url = editId ? `/api/storycard/${editId}` : "/api/storycard";
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: fd });
      const data = await res.json();

      if (!res.ok) {
        setMsg({ text: data.error || "Failed to update record.", type: "danger" });
      } else {
        setMsg({ 
          text: editId ? "Story card updated successfully! ✨" : "New story card published! 🎉", 
          type: "success" 
        });
        resetForm();
        loadStories();
      }
    } catch (err) {
      setMsg({ text: "Network connection error.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (story) => {
    setForm({
      title: story.title,
      shortNote: story.shortNote,
      description: story.description,
    });
    setPreview(story.image);
    setEditId(story._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this story card?")) return;
    try {
      await fetch(`/api/storycard/${id}`, { method: "DELETE" });
      setMsg({ text: "Story card removed.", type: "warning" });
      loadStories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Alert Status Banner */}
   {msg.text && (
  <div className={`alert alert-${msg.type} alert-dismissible fade show rounded-4 shadow-sm mb-4 d-flex align-items-center justify-content-between p-3 border-start border-4 ${msg.type === 'success' ? 'border-success bg-white' : 'border-danger bg-white'}`} role="alert" style={{ zIndex: 1100 }}>
    <div className="d-flex align-items-center gap-3 text-dark">
      <span className={`fs-5 d-inline-flex p-2 rounded-circle ${msg.type === 'success' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
        {msg.type === 'success' ? 'done ' : 'error'}
      </span>
      <div>
        <strong className="d-block text-uppercase small tracking-wide text-secondary" style={{ fontSize: '0.72rem' }}>System Status Notice</strong>
        <span className="fw-black text-dark small m-0 d-block mt-0.5">{msg.text}</span>
      </div>
    </div>
    <button type="button" className="btn-close shadow-none static position-relative p-2 m-0 border-0 bg-transparent text-dark" onClick={() => setMsg({ text: "", type: "" })} aria-label="Close" style={{ opacity: 0.65 }}></button>
  </div>
)}

      {/* Main Grid Workdesk */}
      <div className="row g-4">
        
        <div className="col-lg-5">
          <div className="card shadow-sm border rounded-4 p-4 bg-white sticky-top" style={{ top: "24px", zIndex: 10 }}>
            <div className="mb-4">
              <h3 className="fw-extrabold text-danger m-0">{editId ? "✏️ Edit Story Card" : "➕ Create New Story Card"}</h3>
              <p className="text-secondary small fw-semibold m-0 mt-1">Configure layout cards for deployment to live platform routes.</p>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Card Title */}
              <div className="mb-3">
                <label className="form-label small text-danger fw-bold text-uppercase tracking-wide mb-1">
                  Card Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="form-control bg-light py-2.5 px-3 custom-input text-dark fw-semibold"
                  placeholder="Enter a bold, clear title..."
                  required
                />
              </div>

              {/* Short Summary Line */}
              <div className="mb-3">
                <label className="form-label small text-danger fw-bold text-uppercase tracking-wide mb-1">
                  Short Summary Callout
                </label>
                <input
                  name="shortNote"
                  value={form.shortNote}
                  onChange={handleChange}
                  className="form-control bg-light py-2.5 px-3 custom-input text-dark fw-semibold"
                  placeholder="Write a snappy 1-sentence headline summary note..."
                  required
                />
              </div>

              {/* Full Descriptive Body */}
              <div className="mb-4">
                <label className="form-label small text-danger fw-bold text-uppercase tracking-wide mb-1">
                  Full Descriptive Body
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="form-control bg-light px-3 py-2.5 custom-input text-dark fw-medium"
                  placeholder="Write the comprehensive historical records details here..."
                  rows={5}
                  required
                />
              </div>

              {/* Cover Image Upload Area */}
              <div className="mb-4">
                <label className="form-label small text-danger fw-bold text-uppercase tracking-wide d-block mb-2">
                  Featured Cover Artwork
                </label>
                <div className="border border-dashed rounded-4 p-4 bg-light text-center cursor-pointer position-relative upload-zone">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                    style={{ cursor: "pointer", zIndex: 3 }}
                    required={!editId}
                  />
                  <div className="py-2">
                    <span className="fs-2 d-block mb-1"></span>
                    <span className="small text-danger fw-extrabold d-block">Click or Drag to Upload Asset Image File</span>
                    <span className="text-muted extra-small">Supports JPG, PNG, WEBP profiles</span>
                  </div>
                </div>

                {/* Cover Asset Render Preview Pane */}
                {preview && (
                  <div className="position-relative mt-3 rounded-4 overflow-hidden border bg-dark ratio ratio-16x9 shadow-inner">
                    <Image
                      alt="Local Upload Cache Frame File Asset View"
                      src={preview}
                      fill
                      className="object-fit-cover p-0"
                    />
                  </div>
                )}
              </div>

          
              <div className="d-flex gap-2 mt-4">
                {editId && (
                  <button type="button" className="btn btn-outline-dark w-50 py-2.5 fw-bold text-uppercase btn-lg-text" onClick={resetForm}>
                    Cancel
                  </button>
                )}
                <button type="submit" className={`btn btn-danger py-2.5 fw-bold text-uppercase btn-lg-text ${editId ? 'w-50' : 'w-100'} shadow-sm`} disabled={loading}>
                  {loading ? "Processing..." : editId ? "Save Changes" : "Publish Card"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card shadow-sm border rounded-4 p-4 bg-white h-100">
            
           
            <div className="d-flex justify-content-between align-items-center repo-header-fixed">
              <div>
                <h3 className="fw-extrabold text-dark m-0">Active Repository Deck</h3>
                <p className="text-secondary small fw-medium m-0 mt-1">Reviewing visual cards currently active across public templates.</p>
              </div>
              <span className="badge bg-dark px-3 py-2 fs-6 rounded-pill fw-bold">
                Total: {stories.length}
              </span>
            </div>

            {stories.length === 0 ? (
              <div className="text-center py-5 my-5 text-muted">
                <div className="fs-1 mb-2"></div>
                <h5 className="fw-bold text-dark">No Story Cards Configured</h5>
                <p className="small text-secondary max-w-sm mx-auto">Use the input configuration dashboard to generate assets.</p>
              </div>
            ) : (
              <div className="row g-3">
                {stories.map((story) => (
                  <div className="col-md-6" key={story._id}>
                    <div className="card h-100 shadow-sm border rounded-4 overflow-hidden transition-card bg-white d-flex flex-column justify-content-between">
                      <div>
                        {/* Normalized Responsive Next Image Container */}
                        <div className="position-relative w-100 bg-dark ratio ratio-16x9 border-bottom">
                          <Image
                            src={story.image || "/img/fallback.png"}
                            alt={story.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-fit-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="fw-bold text-dark m-0 tracking-tight text-truncate">{story.title}</h4>
                          
                          <div className="bg-danger-subtle text-danger border border-danger-subtle my-2 px-3 py-1.5 small fw-bold rounded-3 leading-snug">
                             {story.shortNote}
                          </div>
                          
                          <p className="text-dark fw-medium text-truncate-3 mt-2 m-0 leading-relaxed" style={{ fontSize: "0.88rem" }}>
                            {story.description}
                          </p>
                        </div>
                      </div>

                      {/* Control Operations Deck Bar */}
                      <div className="p-3 bg-light border-top d-flex gap-2 justify-content-end">
                        <button className="btn btn-sm btn-dark px-3 fw-bold rounded-3" onClick={() => handleEdit(story)}>
                          Edit Card
                        </button>
                        <button className="btn btn-sm btn-outline-danger px-3 fw-bold rounded-3" onClick={() => handleDelete(story._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      <style jsx>{`
        :global(.fw-extrabold) {
          font-weight: 800 !important;
        }

        .repo-header-fixed {
          padding-bottom: 1rem !important;
          margin-bottom: 1.5rem !important;
          border-bottom: 1px solid #dee2e6 !important;
        }

        :global(.custom-input) {
          color: #111111 !important; 
          border: 2px solid #cbd5e1 !important;
          transition: all 0.2s ease-in-out;
        }
        :global(.custom-input:focus) {
          border-color: #dc3545 !important;
          background-color: #ffffff !important;
          box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.15) !important;
        }
        :global(.custom-input::placeholder) {
          color: #777777 !important;
          font-weight: 500;
        }

        .border-dashed {
          border-style: dashed !important;
          border-width: 2px !important;
          border-color: #cbd5e1 !important;
          transition: 0.2s ease-in-out;
        }
        .upload-zone:hover {
          border-color: #dc3545 !important;
          background-color: #fff5f5 !important;
        }
        .text-truncate-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        .btn-lg-text {
          font-size: 0.9rem;
          letter-spacing: 0.5px;
        }
        .extra-small {
          font-size: 0.75rem;
          font-weight: 600;
        }
        :global(.transition-card) {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        :global(.transition-card:hover) {
          transform: translateY(-4px);
          box-shadow: 0 0.75rem 1.5rem rgba(0,0,0,0.12) !important;
        }
      `}</style>
    </div>
  );
}