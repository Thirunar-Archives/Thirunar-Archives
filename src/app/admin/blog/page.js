"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [existingImages, setExistingImages] = useState([]);

  const [form, setForm] = useState({
    title: "",
    shortNote: "",
    longNote: "",
    image1: null,
    image2: null,
    image3: null,
  });

  const [previews, setPreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  async function loadBlogs() {
    try {
      setLoading(true);
      const res = await fetch("/api/blog");
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching system blogs:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  function updateForm(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));

    if (value instanceof File) {
      setPreviews(prev => ({
        ...prev,
        [key]: URL.createObjectURL(value)
      }));
    }
  }

  async function submitBlog(e) {
    e.preventDefault();
    setLoading(true);

    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/blog/${editId}` : "/api/blog";

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("shortNote", form.shortNote);
    formData.append("longNote", form.longNote);

    if (editId) {
      existingImages.forEach((img) => formData.append("existingImages", img));
    }

    if (form.image1) formData.append("image1", form.image1);
    if (form.image2) formData.append("image2", form.image2);
    if (form.image3) formData.append("image3", form.image3);

    try {
      const res = await fetch(url, { method, body: formData });
      if (res.ok) {
        setForm({
          title: "",
          shortNote: "",
          longNote: "",
          image1: null,
          image2: null,
          image3: null,
        });
        setPreviews({ image1: null, image2: null, image3: null });
        setExistingImages([]);
        setEditId(null);
        alert("Blog entry successfully synchronized to Cloud! ✨");
        await loadBlogs();
      } else {
        alert("Failed to submit blog. Please check your data payloads.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function editBlog(blog) {
    setEditId(blog._id);
    setExistingImages(blog.images || []);
    setPreviews({ image1: null, image2: null, image3: null });

    setForm({
      title: blog.title,
      shortNote: blog.shortNote,
      longNote: blog.longNote,
      image1: null,
      image2: null,
      image3: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteBlog(id) {
    if (!confirm("Are you sure you want to permanently delete this blog archive?")) return;
    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    if (res.ok) loadBlogs();
  }

  useEffect(() => {
    if (!window.bootstrap || blogs.length === 0) return;

    const timer = setTimeout(() => {
      document.querySelectorAll(".carousel").forEach((carousel) => {
        try {
          new window.bootstrap.Carousel(carousel, {
            interval: 2200,
            ride: "carousel",
            pause: "hover",
            wrap: true,
          });
        } catch (err) {}
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [blogs]);

  return (
    <div className="container-fluid py-4 page-bg-refresh">
      
      <style>{`
        .carousel-indicators [data-bs-target] {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.6);
        }
        .carousel-indicators .active {
          background-color: #dc3545 !important;
        }
      `}</style>

      <div className="p-4 p-md-5 mb-4 bg-white rounded-4 main-hero-shadow border-start border-danger border-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h1 className="fw-black text-dark tracking-tight m-0">Editorial Column Hub</h1>
          <p className="text-dark fw-semibold small m-0 mt-2 opacity-75">Draft, format, review, and deploy research articles and chronicles across the public timeline archive.</p>
        </div>
      </div>

      <div className="row g-4">
        
        <div className="col-lg-5">
          <div className="card shadow-md border-0 rounded-4 p-4 bg-white sticky-top" style={{ top: "24px", zIndex: 10 }}>
            <div className="mb-4 border-bottom pb-3">
              <h3 className="fw-black text-danger m-0">{editId ? "✏️ Edit Blog Article" : "➕ Compose New Entry"}</h3>
              <p className="text-dark fw-bold small m-0 mt-1 opacity-50">Write and adjust parameters to update user feed metrics live.</p>
            </div>

            <form onSubmit={submitBlog} encType="multipart/form-data">
              
              <div className="mb-3">
                <label className="form-label small text-danger fw-black text-uppercase tracking-wider mb-1">Blog Title</label>
                <input
                  className="form-control bg-light py-2.5 px-3 custom-input text-dark fw-bold"
                  placeholder="Enter a descriptive, clear title statement..."
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small text-danger fw-black text-uppercase tracking-wider mb-1">Short Callout Summary</label>
                <textarea
                  className="form-control bg-light px-3 py-2.5 custom-input text-dark fw-semibold"
                  placeholder="Snappy 1-sentence headline line"
                  value={form.shortNote}
                  onChange={(e) => updateForm("shortNote", e.target.value)}
                  rows={2}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label small text-danger fw-black text-uppercase tracking-wider mb-1">Full Article Body Description</label>
                <textarea
                  className="form-control bg-light px-3 py-2.5 custom-input text-dark fw-medium"
                  placeholder="Compose your comprehensive journalistic article narrative structure here..."
                  value={form.longNote}
                  onChange={(e) => updateForm("longNote", e.target.value)}
                  rows={6}
                  required
                />
              </div>

              {editId && existingImages.length > 0 && (
                <div className="mb-4 p-3 bg-light border rounded-4 shadow-inner">
                  <label className="form-label small text-dark fw-black text-uppercase tracking-wide d-block mb-2">Deployed Assets on Server</label>
                  <div className="d-flex flex-wrap gap-2">
                    {existingImages.map((img, i) => (
                      <div className="position-relative border rounded-3 overflow-hidden bg-dark" style={{ width: "64px", height: "64px" }} key={i}>
                        <Image src={img} fill className="object-fit-cover" alt="Server backup data entry layer" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="form-label small text-danger fw-black text-uppercase tracking-wider d-block mb-2">Featured Banner Artwork (Up to 3 Images)</label>
                
                <div className="d-flex flex-column gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control bg-light custom-input text-dark fw-semibold text-xs py-2"
                    onChange={(e) => updateForm("image1", e.target.files[0])}
                    required={!editId}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control bg-light custom-input text-dark fw-semibold text-xs py-2"
                    onChange={(e) => updateForm("image2", e.target.files[0])}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control bg-light custom-input text-dark fw-semibold text-xs py-2"
                    onChange={(e) => updateForm("image3", e.target.files[0])}
                  />
                </div>

                {(previews.image1 || previews.image2 || previews.image3) && (
                  <div className="mt-3">
                    <label className="form-label small text-muted fw-bold text-uppercase mb-1">Local Image Upload Buffers</label>
                    <div className="preview-scroll-frame border rounded-4 bg-light p-2 shadow-sm d-flex gap-2">
                      {["image1", "image2", "image3"].map((field) => {
                        if (!previews[field]) return null;
                        return (
                          <div className="position-relative rounded-3 overflow-hidden border shadow-inner flex-shrink-0 bg-dark" style={{ width: "120px", height: "80px" }} key={field}>
                            <Image alt="Local preview frame layout" src={previews[field]} fill className="object-fit-cover" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="d-flex flex-column gap-2 mt-4">
                <button type="submit" className="btn btn-danger py-2.5 fw-black text-uppercase btn-lg-text shadow-sm rounded-3" disabled={loading}>
                  {loading ? "Processing..." : editId ? "Save Article Changes" : "Deploy Live Article to Site"}
                </button>
                {editId && (
                  <button type="button" className="btn btn-dark py-2 fw-black text-uppercase rounded-3 small" onClick={() => editBlog(null)}>
                    Cancel Layout Configuration Edit
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card shadow-md border-0 rounded-4 p-4 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-2 pb-3">
              <div>
                <h3 className="fw-black text-dark m-0">Active Repository Deck</h3>
                <p className="text-dark fw-bold small m-0 mt-1 opacity-50">Reviewing synchronized editorial nodes active on production databases.</p>
              </div>
              <span className="badge bg-danger text-white px-3 py-2 fs-6 rounded-pill fw-black">
                Total: {blogs.length}
              </span>
            </div>

            {loading ? (
              <div className="text-center py-5 my-5">
                <div className="spinner-border text-danger mb-3" role="status"></div>
                <h6 className="text-dark fw-bold text-uppercase tracking-wider">Synchronizing Node Collections...</h6>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-5 my-5 text-muted">
                <div className="fs-1 mb-2">📥</div>
                <h5 className="fw-black text-dark">No Articles Logged</h5>
                <p className="small text-secondary max-w-sm mx-auto fw-medium">Use the input compose control workspace console on the left to deploy entries.</p>
              </div>
            ) : (
              <div className="row g-4">
                {blogs.map((blog) => (
                  <div className="col-md-6" key={blog._id}>
                    <div className="card h-100 shadow-sm border border-light-custom rounded-4 overflow-hidden transition-card bg-white d-flex flex-column justify-content-between">
                      
                      <div>
                        <div id={`admin-carousel-${blog._id}`} className="carousel slide carousel-fade bg-dark" data-bs-ride="carousel">
                          <div className="carousel-indicators">
                            {blog.images?.map((_, i) => (
                              <button
                                key={i}
                                type="button"
                                data-bs-target={`#admin-carousel-${blog._id}`}
                                data-bs-slide-to={i}
                                className={i === 0 ? "active" : ""}
                              ></button>
                            ))}
                          </div>
                          
                          <div className="carousel-inner">
                            {blog.images?.map((img, i) => (
                              <div className={`carousel-item position-relative w-100 ratio ratio-16x9 ${i === 0 ? "active" : ""}`} key={i}>
                                <Image
                                  src={img || "/img/fallback.png"}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 400px"
                                  className="object-fit-cover"
                                  alt="Dynamic contextual editorial snapshot gallery stream slice asset"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-3">
                          <h4 className="fw-black text-dark m-0 tracking-tight text-truncate">{blog.title}</h4>
                          
                          <div className="bg-danger-subtle text-danger border border-danger-subtle my-2 px-2.5 py-1.5 small fw-black rounded-3 leading-snug">
                            {blog.shortNote}
                          </div>
                          
                          <p className="text-dark fw-medium text-truncate-3 mt-2 m-0 leading-relaxed opacity-75" style={{ fontSize: "0.88rem" }}>
                            {blog.longNote}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 bg-light border-top border-light-custom d-flex gap-2 justify-content-end">
                        <button className="btn btn-sm btn-dark px-3 fw-bold rounded-3" onClick={() => editBlog(blog)}>
                          Edit Post
                        </button>
                        <button className="btn btn-sm btn-outline-danger px-3 fw-bold rounded-3" onClick={() => deleteBlog(blog._id)}>
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
        :global(.fw-black) {
          font-weight: 900 !important;
        }

        .page-bg-refresh {
          background-color: #f8fafc;
        }
        .main-hero-shadow {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
        }
        .border-light-custom {
          border-color: #edf2f7 !important;
        }

        :global(.custom-input) {
          color: #0f172a !important; 
          border: 2px solid #cbd5e1 !important;
          transition: all 0.2s ease-in-out;
        }
        :global(.custom-input:focus) {
          border-color: #dc3545 !important;
          background-color: #ffffff !important;
          box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.15) !important;
        }
        :global(.custom-input::placeholder) {
          color: #64748b !important;
          font-weight: 600;
        }

        .preview-scroll-frame {
          max-height: 120px;
          overflow-x: auto;
          overflow-y: hidden;
          background-color: #f1f5f9 !important;
          border: 2px solid #e2e8f0 !important;
        }
        .preview-scroll-frame::-webkit-scrollbar {
          height: 5px;
        }
        .preview-scroll-frame::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .preview-scroll-frame::-webkit-scrollbar-thumb {
          background: #dc3545;
          border-radius: 10px;
        }

        .text-truncate-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .btn-lg-text {
          font-size: 0.88rem;
          letter-spacing: 0.5px;
        }
        :global(.transition-card) {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        :global(.transition-card:hover) {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important;
        }
      `}</style>
    </div>
  );
}