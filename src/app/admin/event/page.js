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
  const [editingEvent, setEditingEvent] = useState(null); // Event being edited
  const swiperRef = useRef(null);

  const months = useMemo(
    () => [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ], []
  );

  // Fetch all events
  const loadEvents = async () => {
  const res = await fetch("/api/event");
  const data = await res.json();
  setEvents(data);
};


  useEffect(() => {
  const fetchData = async () => {
    await loadEvents();
  };
  fetchData();
}, []);

  // Group events by month
 const groupedEvents = useMemo(() => {
  const groups = {};
  months.forEach((m) => (groups[m] = []));
  events.forEach((ev) => {
    groups[ev.month].push(ev);
  });
  return groups;
}, [events, months]); // ✔ only events changes

  useEffect(() => {
    if (swiperRef.current) {
      const index = months.indexOf(selectedMonth);
      swiperRef.current.slideTo(index, 400);
    }
  }, [selectedMonth, months]);

  // Handle add/update event
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let url = "/api/event";
    let method = "POST";

    if (editingEvent) {
      url = `/api/event/${editingEvent._id}`;
      method = "PUT";
    }

    const res = await fetch(url, { method, body: formData });
    const data = await res.json();

    if (data.success) {
      loadEvents();
      e.target.reset();
      setEditingEvent(null);
    }
  };

  // Delete event
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    await fetch(`/api/event/${id}`, { method: "DELETE" });
    loadEvents();
  };

  // Populate form for editing
  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  return (
    <div className="bg-style">
      <div className="container py-5">
        <h1 className="fw-bold text-center pt-3">Event Admin Page</h1>
        {/* Add/Edit Event Form */}
        <div className="row d-flex justify-content-center pt-3">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <form
              className="border p-4 rounded-4 shadow-sm mb-5"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <input
                name="title"
                className="form-control mb-3"
                placeholder="Event Title"
                defaultValue={editingEvent?.title || ""}
                required
              />
              <select
                name="month"
                className="form-control mb-3"
                defaultValue={editingEvent?.month || ""}
                required
              >
                <option value="">Select Month</option>
                {months.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <input
                name="date"
                type="number"
                className="form-control mb-3"
                placeholder="Date (e.g., 04)"
                defaultValue={editingEvent?.day || ""}
                required
              />
              <input
                name="dayTxt"
                className="form-control mb-3"
                placeholder="Day Text (e.g., MON)"
                defaultValue={editingEvent?.dayTxt || ""}
                required
              />
              <input
                name="location"
                className="form-control mb-3"
                placeholder="Location"
                defaultValue={editingEvent?.location || ""}
                required
              />
              <textarea
                name="content"
                className="form-control mb-3"
                placeholder="Short Description"
                rows={3}
                defaultValue={editingEvent?.content || ""}
                required
              />
              <label className="fw-bold">Upload Event Image</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="form-control mb-3"
                required={!editingEvent} 
              />
              <button className="btn btn-primary w-100 mt-3">
                {editingEvent ? "Update " : "Add "}
              </button>
              {editingEvent && (
                <button
                  type="button"
                  className="btn btn-danger w-100 mt-2"
                  onClick={() => setEditingEvent(null)}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>
        {/* Month Title */}
        <h1 className="text-center mb-5 fw-bold">{selectedMonth} &apos;25</h1>
        {/* Event Cards */}
        <div className="row g-4">
          {groupedEvents[selectedMonth]?.length === 0 && (
            <p className="text-center text-muted fs-4">
              No events for {selectedMonth}.
            </p>
          )}
          {groupedEvents[selectedMonth]?.map((event) => (
            <div className="col-md-4" key={event._id}>
              <div className="bg-white border rounded-4 p-4 position-relative event-card">
                <div className="event-date-box">
                  <div className="fw-bold">{event.dayTxt}</div>
                  <div className="fs-4 fw-bold">{event.day}</div>
                </div>
                <div className="mt-5 pt-3">
                  <Image
                    src={event.image}
                    width={500}
                    height={300}
                    alt={event.title}
                    className="card-img-top rounded-4"
                  />
                  <h4 className="fw-bold mt-2">{event.title}</h4>
                  <div className="border-bottom mt-2 mb-3" style={{ width: "60px" }} />
                  <p className="mt-2">{event.content}</p>
                  <p className="text-primary mb-0">{event.location}</p>

                  {/* Edit/Delete Buttons */}
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Month Slider */}
        <div className="mt-5">
          <Swiper
            slidesPerView="auto"
            spaceBetween={10}
            freeMode={true}
            modules={[FreeMode]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {months.map((month, index) => (
              <SwiperSlide key={index} style={{ width: "auto", paddingRight: 5 }}>
                <button
                  onClick={() => setSelectedMonth(month)}
                  className={`btn px-4 py-2 ${
                    selectedMonth === month ? "btn-danger-active" : "btn-light border"
                  }`}
                >
                  {month}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
