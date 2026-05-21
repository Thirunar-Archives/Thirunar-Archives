"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Scrollbar } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

export default function Events() {
  const currentYear = new Date().getFullYear(); 
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [allEvents, setAllEvents] = useState([]); 
  const swiperRef = useRef(null);

  const months = useMemo(
    () => [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    []
  );

  // Load Events from Cloud API
  const loadEvents = async () => {
    try {
      const res = await fetch("/api/event");
      const data = await res.json();
      const eventData = Array.isArray(data) ? data : (data.events || []);
      setAllEvents(eventData);
    } catch (error) {
      console.error("Error loading events:", error);
      setAllEvents([]); 
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Filter Logic
  const monthEvents = useMemo(() => {
    if (!Array.isArray(allEvents)) return [];
    return allEvents.filter((event) => event.month === selectedMonth);
  }, [allEvents, selectedMonth]);

  // Sync Swiper position when month changes
  useEffect(() => {
    if (swiperRef.current) {
      const index = months.indexOf(selectedMonth);
      swiperRef.current.slideTo(index, 400);
    }
  }, [selectedMonth, months]);

  return (
    <>
      <div className="bg-style min-vh-100 pb-5">
        <div className="container py-5">
          {/* Header */}
          <h1 className="text-center mb-5 fw-bold text-uppercase">
            {selectedMonth} <span className="text-danger">'{currentYear}</span>
          </h1>

         
          <div className="row g-4 mb-5">
            {monthEvents.length === 0 ? (
              <div className="col-12 text-center py-5">
                <p className="text-muted fs-4 italic">
                  No events scheduled for {selectedMonth}.
                </p>
              </div>
            ) : (
              monthEvents.map((event, index) => (
                <div className="col-md-4" key={index}>
                  <div className="bg-white border-0 shadow-sm rounded-4 p-4 position-relative event-card h-100 transition-hover">
                    
                  
                    <div className="event-date-box shadow-sm">
                      <div className="fw-bold text-uppercase small">{event.dayTxt}</div>
                      <div className="fs-4 fw-bold text-danger">{event.day}</div>
                    </div>

                    <div className="mt-5 pt-3">
                      {event.image && (
                        <Image
                          src={event.image}
                          width={500}
                          height={300}
                          alt={event.title}
                          className="card-img-top rounded-4 object-fit-cover mb-3 shadow-sm"
                          style={{ height: '200px' }}
                        />
                      )}
                      
                      <span className="badge bg-light text-danger border border-danger mb-2">
                        {event.category || "Community Event"}
                      </span>

                      <h4 className="fw-bold">{event.title}</h4>
                      <div className="bg-danger mt-1 mb-3" style={{ width: "40px", height: "3px" }}></div>
                      
                      <p className="text-muted small leading-relaxed">{event.content}</p>
                      
                      <div className="d-flex align-items-center mt-3 text-primary small fw-bold">
                        <i className="bi bi-geo-alt me-2"></i>
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-5 pt-4 border-top">
            <h6 className="text-muted small fw-bold mb-3 text-uppercase tracking-wider">Select Month</h6>
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={12}
              freeMode={true}
              mousewheel={{ forceToAxis: true }}
              grabCursor={true}
              scrollbar={{ draggable: true, hide: false }}
              modules={[FreeMode, Mousewheel, Scrollbar]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="month-swiper pb-4"
            >
              {months.map((month, index) => (
                <SwiperSlide key={index} style={{ width: "auto" }}>
                  <button
                    onClick={() => setSelectedMonth(month)}
                    className={`btn px-4 py-2 rounded-pill fw-bold transition-all ${
                      selectedMonth === month
                        ? "btn-danger shadow-sm active-month"
                        : "btn-light border text-muted"
                    }`}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {month}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style jsx>{`
        .event-date-box {
          position: absolute;
          top: -15px;
          left: 25px;
          background: white;
          padding: 10px 15px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #eee;
          z-index: 2;
        }
        .transition-hover {
          transition: all 0.3s ease;
        }
        .transition-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important;
        }
        .active-month {
          transform: scale(1.05);
        }

        :global(.month-swiper .swiper-scrollbar) {
          background: #e9ecef; 
          height: 5px;
          bottom: 0px;
        }
        :global(.month-swiper .swiper-scrollbar-drag) {
          background: #dc3545; /* Brand Red */
          cursor: pointer;
        }
        :global(.month-swiper) {
          padding-bottom: 30px !important;
        }
      `}</style>
    </>
  );
}