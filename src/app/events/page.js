"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";

export default function Events() {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [allEvents, setAllEvents] = useState([]);
  const swiperRef = useRef(null);

  const months = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  // 🔥 Fetch events from API
  const loadEvents = async () => {
    const res = await fetch("/api/event");
    const data = await res.json();
    setAllEvents(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadEvents();
    };
    fetchData();
  }, []);
  // 🔥 Filter events by selected month
  const monthEvents = allEvents.filter(
    (event) => event.month === selectedMonth
  );

  // Auto-scroll to active month in Swiper
  useEffect(() => {
    if (swiperRef.current) {
      const index = months.indexOf(selectedMonth);
      swiperRef.current.slideTo(index, 400);
    }
  }, [selectedMonth, months]);

  return (
    <>
      <div className="bg-style">
        <div className="container py-5">
          <h1 className="text-center mb-5 fw-bold">{selectedMonth} &apos;20</h1>
          <div className="row g-4">
            {monthEvents.length === 0 && (
              <p className="text-center text-muted fs-4">
                No events for {selectedMonth}.
              </p>
            )}
            {monthEvents.map((event, index) => (
              <div className="col-md-4" key={index}>
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
                    <div
                      className="border-bottom mt-2 mb-3"
                      style={{ width: "60px" }}
                    ></div>
                    <p className="mt-2">{event.content}</p>
                    <p className="text-primary mb-0">{event.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Swiper
              slidesPerView="auto"
              spaceBetween={10}
              freeMode={true}
              modules={[FreeMode]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {months.map((month, index) => (
                <SwiperSlide
                  key={index}
                  style={{ width: "auto", paddingRight: 5 }}
                >
                  <button
                    onClick={() => setSelectedMonth(month)}
                    className={`btn px-4 py-2 ${
                      selectedMonth === month
                        ? "btn-danger-active"
                        : "btn-light border"
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
    </>
  );
}
