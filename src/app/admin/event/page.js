"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function EventAdminPage() {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null); 
  const formRef = useRef(null); 

  const months = useMemo(() => [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ], []);

  const loadEvents = async () => {
    try {
      const res = await fetch("/api/event");
      const data = await res.json();
      if (Array.isArray(data)) setEvents(data);
    } catch (err) {
      console.error("Failed to load events", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const groupedEvents = useMemo(() => {
    const groups = {};
    months.forEach((m) => (groups[m] = []));
    events.forEach((ev) => {
      if (groups[ev.month]) groups[ev.month].push(ev);
    });
    return groups;
  }, [events, months]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    let url = "/api/event";
    let method = "POST";

    if (editingEvent) {
      url = `/api/event/${editingEvent._id}`;
      method = "PUT";
    }

    try {
      const res = await fetch(url, { method, body: formData });
      const result = await res.json();

      if (res.ok) {
        await loadEvents();
        e.target.reset();
        setPreview(null);
        setEditingEvent(null);
        alert("Event successfully synced to Cloud! ");
      } else {
        alert("Upload Failed: " + (result.error || "Unknown Error"));
      }
    } catch (err) {
      alert("Network timeout. The image might be too large or the connection too slow.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this event from cloud?")) return;
    const res = await fetch(`/api/event/${id}`, { method: "DELETE" });
    if (res.ok) loadEvents();
  };

  const handleEditInit = (ev) => {
    setEditingEvent(ev);
    setPreview(ev.image || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setPreview(null);
    if (formRef.current) formRef.current.reset();
  };

  return (
    <div className="container-fluid py-4 page-bg-refresh">
      
      <div className="p-4 p-md-5 mb-4 bg-white rounded-4 main-hero-shadow border-start border-danger border-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h1 className="fw-black text-dark tracking-tight m-0">Central Event Hub</h1>
          <p className="text-dark fw-semibold small m-0 mt-2 opacity-75">Design, schedule, and configure seasonal archive timelines, exhibitions, and public coordinates.</p>
        </div>
      </div>

      <div className="row g-4">
        
        <div className="col-lg-5">
          <div className="card shadow-md border-0 rounded-4 p-4 bg-white sticky-top" style={{ top: "24px", zIndex: 10 }}>
            <div className="mb-4 border-bottom pb-3">
              <h3 className="fw-black text-danger m-0">{editingEvent ? "✏️ Edit Event Entry" : "➕ Schedule New Event"}</h3>
              <p className="text-dark fw-bold small m-0 mt-1 opacity-50">Populate structural values to synchronize data nodes live.</p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
              
              <div className="mb-3">
                <label className="form-label small text-danger fw-black text-uppercase tracking-wider mb-1">Event Title</label>
                <input 
                  name="title" 
                  className="form-control bg-light py-2.5 px-3 custom-input text-dark fw-bold" 
                  placeholder="Enter high-visibility title line..." 
                  defaultValue={editingEvent?.title || ""} 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label small text-danger fw-black text-uppercase tracking-wider mb-1">Calendar Schedule Month</label>
                <select 
                  name="month" 
                  className="form-select bg-light py-2.5 px-3 custom-input text-dark fw-bold" 
                  defaultValue={editingEvent?.month || ""} 
                  required
                >
                  <option value="">Select Target Month Assignment</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label small text-danger fw-black text-uppercase tracking-wider mb-1">Numerical Date</label>
                  <input 
                    name="date" 
                    type="number" 
                    className="form-control bg-light py-2.5 px-3 custom-input text-dark fw-bold text-center" 
                    placeholder="e.g., 04" 
                    defaultValue={editingEvent?.day || ""} 
                    required 
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small text-danger fw-black text-uppercase tracking-wider mb-1">Weekday Text</label>
                  <input 
                    name="dayTxt" 
                    className="form-control bg-light py-2.5 px-3 custom-input text-dark fw-bold text-center" 
                    placeholder="e.g., THU" 
                    defaultValue={editingEvent?.dayTxt || ""} 
                    required 
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small text-danger fw-black text-uppercase tracking-wider mb-1">Geographic Location Venue</label>
                <input 
                  name="location" 
                  className="form-control bg-light py-2.5 px-3 custom-input text-dark fw-bold" 
                  placeholder="Venue, hall, city or coordinate paths..." 
                  defaultValue={editingEvent?.location || ""} 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label small text-danger fw-black text-uppercase tracking-wider mb-1">Comprehensive Event Summary</label>
                <textarea 
                  name="content" 
                  className="form-control bg-light px-3 py-2.5 custom-input text-dark fw-semibold" 
                  placeholder="Provide contextual agenda definitions regarding this scheduled resource layer..." 
                  rows={3} 
                  defaultValue={editingEvent?.content || ""} 
                  required 
                />
              </div>

              <div className="mb-4">
                <label className="form-label small text-danger fw-black text-uppercase tracking-wider d-block mb-2">Featured Banner Artwork</label>
                <div className="border border-dashed-red rounded-4 p-4 bg-light text-center position-relative upload-zone">
                  <input 
                    name="image" 
                    type="file" 
                    accept="image/*"
                    className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer" 
                    style={{ zIndex: 3 }}
                    onChange={handleImageChange}
                    required={!editingEvent} 
                  />
                  <div className="py-1">
                    <span className="fs-1 d-block mb-1"></span>
                    <span className="small text-danger fw-black text-uppercase d-block tracking-wide">Select Event Graphic Media</span>
                  </div>
                </div>

                {preview && (
                  <div className="mt-3">
                    <label className="form-label small text-dark fw-bold text-uppercase mb-1">Banner Asset Viewport Preview</label>
                    <div className="preview-scroll-frame border rounded-4 bg-light p-2 shadow-sm">
                      <div className="position-relative w-100 ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm bg-dark">
                        <Image
                          alt="Event infrastructure asset deployment target graphic visualization"
                          src={preview}
                          fill
                          className="object-fit-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="d-flex flex-column gap-2 mt-4">
                <button type="submit" className="btn btn-danger py-2.5 fw-black text-uppercase btn-lg-text shadow-sm rounded-3" disabled={loading}>
                  {loading ? "Processing..." : editingEvent ? "Save Event Modifications" : "Deploy Live Event to Public Site"}
                </button>
                {editingEvent && (
                  <button type="button" className="btn btn-dark py-2 fw-black text-uppercase rounded-3 small" onClick={handleCancelEdit}>
                    Cancel Configuration Edit
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card shadow-md border-0 rounded-4 p-4 bg-white h-100">
            
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4 border-bottom border-2 pb-3">
              <div>
                <h3 className="fw-black text-dark m-0">Active Repository Deck</h3>
                <p className="text-dark fw-bold small m-0 mt-1 opacity-50">Reviewing synchronized events partitioned by month metrics.</p>
              </div>
              <span className="badge bg-danger text-white px-3 py-2 fs-6 rounded-pill fw-black text-uppercase tracking-wider align-self-start">
                Total: {groupedEvents[selectedMonth]?.length || 0}
              </span>
            </div>

            <div className="mb-4 bg-light p-2 rounded-4 border">
              <Swiper slidesPerView="auto" spaceBetween={8} freeMode={true} modules={[FreeMode]}>
                {months.map((m) => (
                  <SwiperSlide key={m} style={{ width: "auto" }}>
                    <button 
                      type="button"
                      onClick={() => setSelectedMonth(m)} 
                      className={`btn btn-sm px-3.5 py-2 text-uppercase fw-black rounded-3 font-sans tracking-wide text-xs custom-month-btn ${
                        selectedMonth === m ? 'is-active' : 'is-inactive'
                      }`}
                    >
                      {m.substring(0, 3)}
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {groupedEvents[selectedMonth]?.length === 0 ? (
              <div className="text-center py-5 my-5 text-muted">
                <div className="fs-1 mb-2"></div>
                <h5 className="fw-black text-dark">No Scheduled Events</h5>
                <p className="small text-secondary max-w-xs mx-auto fw-medium">No schedule timelines have been allocated under the {selectedMonth} query window node.</p>
              </div>
            ) : (
              <div className="row g-3">
                {groupedEvents[selectedMonth]?.map((ev) => (
                  <div className="col-md-6" key={ev._id}>
                    <div className="card h-100 shadow-sm border border-light-custom rounded-4 overflow-hidden transition-card bg-white d-flex flex-column justify-content-between">
                      <div>
                        <div className="position-relative w-100 bg-dark ratio ratio-16x9 border-bottom">
                          <Image
                            src={ev.image || "/img/fallback.png"}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            alt={ev.title}
                            className="object-fit-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="fw-black text-dark m-0 tracking-tight text-truncate">{ev.title}</h4>
                          
                          <div className="bg-danger-subtle text-danger border border-danger-subtle my-2 px-2.5 py-1.5 small fw-black rounded-3 text-uppercase font-monospace tracking-wide text-xs">
                             {ev.day} {ev.month.substring(0, 3)} | {ev.location}
                          </div>
                          
                          <p className="text-dark fw-bold text-truncate-3 mt-2 m-0 leading-relaxed opacity-75" style={{ fontSize: "0.88rem" }}>
                            {ev.content}
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-light border-top border-light-custom d-flex gap-2 justify-content-end">
                        <button className="btn btn-sm btn-dark px-3 fw-bold rounded-3" onClick={() => handleEditInit(ev)}>Edit Parameters</button>
                        <button className="btn btn-sm btn-outline-danger px-3 fw-bold rounded-3" onClick={() => handleDelete(ev._id)}>Delete</button>
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

        :global(.custom-month-btn) {
          outline: none !important;
          border: 1px solid transparent !important;
          font-weight: 900 !important;
          transition: all 0.2s ease-in-out !important;
        }
        
        :global(.custom-month-btn.is-inactive) {
          background-color: #e2e8f0 !important;
          color: #111111 !important;
          opacity: 1 !important;
        }

        :global(.custom-month-btn.is-active) {
          background-color: #dc3545 !important;
          color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3) !important;
        }

        :global(.custom-month-btn:hover), 
        :global(.custom-month-btn:focus), 
        :global(.custom-month-btn:active) {
          background-color: #dc3545 !important;
          color: #ffffff !important;
          opacity: 1 !important;
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
        :global(.swiper-slide) {
          width: auto !important;
        }
      `}</style>
    </div>
  );
}