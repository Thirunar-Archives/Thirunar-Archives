"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function StoryCard() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [stories, setStories] = useState([]);

  // Load Bootstrap JS
  useEffect(() => {
    async function loadBS() {
      const bootstrap = await import(
        "bootstrap/dist/js/bootstrap.bundle.min.js"
      );
      window.bootstrap = bootstrap;
    }
    loadBS();
    loadStories();
  }, []);

  // Fetch stories from API
  async function loadStories() {
    try {
      const res = await fetch("/api/storycard");
      const data = await res.json();
      setStories(data);
    } catch (err) {
      console.error("Error loading stories:", err);
    }
  }

  // Open modal with story data
  const openModal = (story) => {
    setSelectedStory(story);

    setTimeout(() => {
      const modal = new window.bootstrap.Modal(
        document.getElementById("storyModal")
      );
      modal.show();
    }, 150);
  };
  const section = {
    about: {
      title: "About Thirunar Archives",
      desc: "We preserve lived experiences, culture, and voices of transgender, non-binary, and gender-diverse communities...",
      img: "/img/hero-1.png",
    },
  };
  return (
    <>
      <div className="bg-style">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="fw-bold mt-2">
                We are committed to preserving and celebrating{" "}
                <span className="text-primary">
                  Thirunar culture & identities.
                </span>
              </h2>
              <p className="mt-3">
                At Thirunar Archives, our mission is to document, digitize, and
                share lived experiences...
              </p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-danger mt-3"
                  onClick={() => openModal(section.about)}
                >
                  Learn More →
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <Image
                src="/img/hero-1.png"
                alt="Thirunar Archives"
                className="img-fluid rounded-3 shadow-sm"
                width={1500}
                height={600}
              />
            </div>
          </div>
        </div>
        {/* FULL WIDTH IMAGE */}
        <div className="section-full-img">
          <Image
            src="/img/hero-1.png"
            className="img-fluid w-100"
            alt="banner"
            width={500}
            height={300}
          />
        </div>
        {/* ----------- DYNAMIC STORY SECTIONS ----------- */}
        {stories.map((story, index) => (
          <div className="container py-5" key={story._id}>
            <div
              className={`row align-items-center ${
                index % 2 !== 0 ? "flex-md-row-reverse" : ""
              }`}
            >
              {/* TEXT */}
              <div className="col-md-6">
                <h3 className="fw-bold text-center">{story.title}</h3>
                <p>{story.shortNote}</p>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-danger mt-3"
                    onClick={() => openModal(story)}
                  >
                    Read Story →
                  </button>
                </div>
              </div>
              {/* IMAGE */}
              <div className="col-md-6">
                <Image
                  src={story.image}
                  alt={story.title}
                  className="img-fluid rounded-3 shadow-sm"
                  width={1500}
                  height={500}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* ---------------------- MODAL ---------------------- */}
      <div
        className="modal fade blog-modal-anim"
        id="storyModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4 shadow-lg">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">{selectedStory?.title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {selectedStory && (
                <>
                  <Image
                    src={
                      selectedStory.image ||
                      selectedStory.img ||
                      "/img/placeholder.png"
                    }
                    width={900}
                    height={500}
                    className="d-block w-100 rounded-3 mb-3"
                    alt="Story Image"
                  />

                  <p className="text-dark">
                    {selectedStory.description || selectedStory.desc}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
