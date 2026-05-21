"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MediaPage() {
  const [type, setType] = useState("");
  const [filter, setFilter] = useState("photo");
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    type: "",
    image: null,
    videoThumbnail: null,
  });

  const [previews, setPreviews] = useState({
    image: null,
    videoThumbnail: null
  });

  function updateForm(key, value) {
    setForm({ ...form, [key]: value });

    if (value instanceof File) {
      setPreviews(prev => ({
        ...prev,
        [key]: URL.createObjectURL(value)
      }));
    }
  }

  const loadMedia = async (selectedType) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/media?type=${selectedType}`);
      const data = await res.json();
      setMediaList(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this media asset?")) return;
    await fetch(`/api/media/${id}`, { method: "DELETE" });
    loadMedia(filter);
  };

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
    if (form.videoThumbnail) formData.append("videoThumbnail", form.videoThumbnail);
    
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
    setPreviews({ image: null, videoThumbnail: null });
    setType("");
  }

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
    setPreviews({
      image: item.imageUrl || null,
      videoThumbnail: item.videoThumbnailUrl || null
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    loadMedia(filter);
  }, [filter]);

  return (
    <div className="container-fluid py-4 page-bg-refresh">
      
      <div className="p-4 p-md-5 mb-4 bg-white rounded-4 main-hero-shadow border-start border-danger border-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h1 className="fw-black text-dark tracking-tight m-0">Archive Media Hub</h1>
          <p className="text-dark fw-semibold small m-0 mt-2 opacity-75">Upload, configure, and curate graphic portfolios, streaming video embeds, and print research collections.</p>
        </div>
        
        <div className="bg-dark p-2 rounded-4 shadow-sm d-inline-flex gap-1 align-self-start align-self-md-center border border-secondary border-opacity-20">
          {["photo", "video", "publication"].map((btn) => (
            <button
              key={btn}
              type="button"
              className={`btn btn-sm px-4 py-2 text-uppercase fw-black rounded-3 filter-toggle-btn ${
                filter === btn ? "is-active" : "is-inactive"
              }`}
              onClick={() => setFilter(btn)}
            >
              {btn}s
            </button>
          ))}
        </div>
      </div>

      <div className="row g-4">
        
        <div className="col-lg-5">
          <div className="card shadow-md border-0 rounded-4 p-4 bg-white sticky-top" style={{ top: "24px", zIndex: 10 }}>
            <div className="mb-4 border-bottom pb-3">
              <h3 className="fw-black text-danger m-0">{editId ? "Edit Media Entry" : "Deploy Media Asset"}</h3>
              <p className="text-dark fw-bold small m-0 mt-1 opacity-50">Populate configurations to update client viewports instantly.</p>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              
              <div className="mb-3">
                <label className="form-label small text-danger fw-black text-uppercase tracking-wider mb-1">Media Type</label>
                <select
                  className="form-select bg-light py-2.5 px-3 custom-input text-dark fw-bold"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    updateForm("type", e.target.value);
                  }}
                  required
                >
                  <option value="">Select Resource Profiler</option>
                  <option value="photo">Photo Gallery Piece</option>
                  <option value="video">Streaming Video Embed</option>
                  <option value="publication">Research Publication Text</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small text-danger fw-black text-uppercase tracking-wider mb-1">Asset Title</label>
                <input
                  type="text"
                  placeholder="Enter a striking, high-visibility title line..."
                  className="form-control bg-light py-2.5 px-3 custom-input text-dark fw-bold"
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label small text-danger fw-black text-uppercase tracking-wider mb-1">Comprehensive Description Summary</label>
                <textarea
                  placeholder="Provide deep contextual historical summaries regarding this resource layer..."
                  className="form-control bg-light px-3 py-2.5 custom-input text-dark fw-semibold"
                  value={form.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              {type === "photo" && (
                <div className="mb-4 animate-fade">
                  <label className="form-label small text-danger fw-black text-uppercase tracking-wider d-block mb-2">Upload Photo File Source</label>
                  <div className="border border-dashed-red rounded-4 p-4 bg-light text-center position-relative upload-zone">
                    <input
                      type="file"
                      accept="image/*"
                      className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                      style={{ zIndex: 3 }}
                      onChange={(e) => updateForm("image", e.target.files[0])}
                      required={!editId}
                    />
                    <div className="py-2">
                      <span className="small text-danger fw-black text-uppercase d-block tracking-wide">Click or Drop Image Attachment Here</span>
                    </div>
                  </div>

                  {previews.image && (
                    <div className="mt-3">
                      <label className="form-label small text-dark fw-bold text-uppercase mb-1">Active Image Canvas Preview</label>
                      <div className="preview-scroll-frame border rounded-4 bg-light p-2 shadow-sm">
                        <div className="position-relative w-100 ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm bg-dark">
                          <Image
                            alt="Photo canvas view"
                            src={previews.image}
                            fill
                            className="object-fit-cover"
                          />
                        </div>
                        <div className="p-2 mt-1 small text-dark fw-bold font-monospace text-truncate text-center">
                          {form.image ? form.image.name : "Active Source Handle Link"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {type === "video" && (
                <div className="mb-4 animate-fade">
                  <div className="mb-3">
                    <label className="form-label small text-danger fw-black text-uppercase tracking-wider mb-1">Target Streaming URL Address Link</label>
                    <input
                      type="text"
                      className="form-control bg-light py-2.5 px-3 custom-input text-dark fw-bold"
                      placeholder="e.g., https://www.youtube.com/embed/your-video-id"
                      value={form.videoUrl}
                      onChange={(e) => updateForm("videoUrl", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label small text-danger fw-black text-uppercase tracking-wider d-block mb-2">Video Static Thumbnail Cover</label>
                    <div className="border border-dashed-red rounded-4 p-4 bg-light text-center position-relative upload-zone">
                      <input
                        type="file"
                        accept="image/*"
                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                        style={{ zIndex: 3 }}
                        onChange={(e) => updateForm("videoThumbnail", e.target.files[0])}
                      />
                      <div className="py-2">
                        <span className="small text-danger fw-black text-uppercase d-block tracking-wide">Select Static Overlay Cover</span>
                      </div>
                    </div>
                  </div>

                  {previews.videoThumbnail && (
                    <div className="mt-3">
                      <label className="form-label small text-dark fw-bold text-uppercase mb-1">Thumbnail Cover Canvas Preview</label>
                      <div className="preview-scroll-frame border rounded-4 bg-light p-2 shadow-sm">
                        <div className="position-relative w-100 ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm bg-dark">
                          <Image
                            alt="Video asset cover"
                            src={previews.videoThumbnail}
                            fill
                            className="object-fit-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {type === "publication" && (
                <div className="mb-4 animate-fade p-3 border-start border-danger border-4 custom-pub-box rounded-3 shadow-inner">
                  <p className="m-0 text-danger fw-bold small text-center leading-normal">
                    Publication Module verified. No separate digital binary artwork asset requirements required.
                  </p>
                </div>
              )}

              <div className="d-flex gap-2 mt-4">
                {editId && (
                  <button type="button" className="btn btn-dark w-50 py-2.5 fw-black text-uppercase btn-lg-text rounded-3" onClick={resetForm}>
                    Cancel
                  </button>
                )}
                <button type="submit" className={`btn btn-danger py-2.5 fw-black text-uppercase btn-lg-text ${editId ? "w-50" : "w-100"} shadow-sm rounded-3`} disabled={loading}>
                  {loading ? "Processing..." : editId ? "Save Changes" : "Publish to System"}
                </button>
              </div>

            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card shadow-md border-0 rounded-4 p-4 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-2 pb-3">
              <div>
                <h3 className="fw-black text-dark m-0">Active Repository Deck</h3>
                <p className="text-dark fw-bold small m-0 mt-1 opacity-50">Reviewing deployed files filtered by system query matching flags.</p>
              </div>
              <span className="badge bg-danger text-white px-3 py-2 fs-6 rounded-pill fw-black text-uppercase tracking-wider">
                {filter}: {mediaList.length}
              </span>
            </div>

            {loading ? (
              <div className="text-center py-5 my-5">
                <div className="spinner-border text-danger mb-3" role="status"></div>
                <h6 className="text-dark fw-bold text-uppercase tracking-wider">Synchronizing Node Assets...</h6>
              </div>
            ) : mediaList.length === 0 ? (
              <div className="text-center py-5 my-5 text-muted">
                <h5 className="fw-black text-dark">No Media Found</h5>
                <p className="small text-secondary max-w-sm mx-auto fw-medium">No system entries correspond to the active filtered criteria array.</p>
              </div>
            ) : (
              <div className="row g-4">
                {mediaList.map((item) => {
                  const key = item._id;

                  if (item.type === "photo") {
                    return (
                      <div key={key} className="col-md-6">
                        <div className="card h-100 shadow-sm border border-light-custom rounded-4 overflow-hidden transition-card bg-white d-flex flex-column justify-content-between">
                          <div>
                            <div className="position-relative w-100 bg-dark ratio ratio-16x9 border-bottom">
                              <Image
                                src={item.imageUrl || "/img/fallback.png"}
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                alt={item.title}
                                className="object-fit-cover"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="fw-black text-dark m-0 tracking-tight text-truncate">{item.title}</h4>
                              <p className="text-dark fw-bold text-truncate-3 mt-2 m-0 leading-relaxed opacity-75" style={{ fontSize: "0.88rem" }}>
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="p-3 bg-light border-top border-light-custom d-flex gap-2 justify-content-end">
                            <button className="btn btn-sm btn-dark px-3 fw-bold rounded-3" onClick={() => editMedia(item)}>Edit</button>
                            <button className="btn btn-sm btn-outline-danger px-3 fw-bold rounded-3" onClick={() => deleteMedia(item._id)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (item.type === "video") {
                    return (
                      <div key={key} className="col-md-12">
                        <div className="card h-100 shadow-sm border border-light-custom rounded-4 overflow-hidden transition-card bg-white p-3">
                          <div className="ratio ratio-16x9 rounded-3 overflow-hidden border shadow-inner bg-dark">
                            <iframe
                              src={item.videoUrl}
                              title={item.title}
                              allowFullScreen
                              className="border-0"
                            ></iframe>
                          </div>
                          <div className="pt-3 px-1">
                            <h4 className="fw-black text-dark tracking-tight m-0">{item.title}</h4>
                            <p className="text-dark fw-bold mt-2 mb-0 leading-relaxed opacity-75" style={{ fontSize: "0.88rem" }}>
                              {item.description}
                            </p>
                          </div>
                          <div className="mt-4 pt-3 border-top border-light-custom d-flex gap-2 justify-content-end">
                            <button className="btn btn-sm btn-dark px-3 fw-bold rounded-3" onClick={() => editMedia(item)}>Edit Parameters</button>
                            <button className="btn btn-sm btn-outline-danger px-3 fw-bold rounded-3" onClick={() => deleteMedia(item._id)}>Delete Video</button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={key} className="col-md-12">
                      <div className="card shadow-sm border rounded-4 overflow-hidden transition-card bg-white p-4 border-start border-danger border-5">
                        <div className="d-flex align-items-start justify-content-between gap-3">
                          <div>
                            <span className="badge bg-danger text-white fw-black text-xs text-uppercase px-2.5 py-1.5 rounded mb-3 tracking-wide">
                              Research Text
                            </span>
                            <h4 className="fw-black text-dark tracking-tight m-0 leading-snug">{item.title}</h4>
                            <p className="text-dark fw-bold mt-2 m-0 leading-relaxed opacity-75" style={{ fontSize: "0.9rem" }}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-top border-light-custom d-flex gap-2 justify-content-end">
                          <button className="btn btn-sm btn-dark px-3 fw-bold rounded-3" onClick={() => editMedia(item)}>Edit Content</button>
                          <button className="btn btn-sm btn-outline-danger px-3 fw-bold rounded-3" onClick={() => deleteMedia(item._id)}>Delete Entry</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
        .custom-pub-box {
          background-color: #fff5f5;
          border-color: #feb2b2 !important;
        }

        :global(.filter-toggle-btn) {
          outline: none !important;
          border: 1px solid transparent !important;
          transition: all 0.2s ease-in-out !important;
        }
        :global(.filter-toggle-btn.is-inactive) {
          background-color: transparent !important;
          color: #94a3b8 !important;
        }
        :global(.filter-toggle-btn.is-active) {
          background-color: #dc3545 !important;
          color: #ffffff !important;
          box-shadow: 0 4px 10px rgba(220, 53, 69, 0.25) !important;
        }
        :global(.filter-toggle-btn:hover) {
          color: #ffffff !important;
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        :global(.filter-toggle-btn.is-active:hover) {
          background-color: #dc3545 !important;
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

        .border-dashed-red {
          border-style: dashed !important;
          border-width: 2px !important;
          border-color: #f87171 !important;
          transition: 0.2s ease-in-out;
        }
        .upload-zone:hover {
          border-color: #dc3545 !important;
          background-color: #fff5f5 !important;
        }

        .preview-scroll-frame {
          max-height: 260px;
          overflow-y: auto;
          background-color: #f1f5f9 !important;
          border: 2px solid #e2e8f0 !important;
        }
        .preview-scroll-frame::-webkit-scrollbar {
          width: 5px;
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
        .animate-fade {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
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