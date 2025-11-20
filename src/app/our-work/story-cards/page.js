"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StoryCard() {
  const [selectedSection, setSelectedSection] = useState(null);

  // Load Bootstrap JS
  useEffect(() => {
    async function loadBS() {
      const bootstrap = await import("bootstrap/dist/js/bootstrap.bundle.min.js");
      window.bootstrap = bootstrap;
    }
    loadBS();
  }, []);

  const openModal = (section) => {
    setSelectedSection(section);

    setTimeout(() => {
      const modal = new window.bootstrap.Modal(
        document.getElementById("storyModal")
      );
      modal.show();
    }, 150);
  };

  // Data for all sections
  const sections = {
    about: {
      title: "About Thirunar Archives",
      desc: "We preserve lived experiences, culture, and voices of transgender, non-binary, and gender-diverse communities...",
      img: "/img/hero-1.png",
    },
    books: {
      title: "Books & Publications",
      desc: "We publish research books, oral narratives, biographies, and literature celebrating Thirunar lives...",
      img: "/img/hero-1.png",
    },
    archives: {
      title: "Story Archives",
      desc: "Explore interviews, documents, memories, photographs and life-stories that preserve identity & heritage...",
      img: "/img/hero-1.png",
    },
  };

  return (
    <>
      <div className="bg-style">
        {/* SECTION 1 */}
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
                  onClick={() => openModal(sections.about)}
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
        {/* SECTION 2 */}
        <div className="container py-5">
          <div className="row align-items-center flex-md-row-reverse">
            <div className="col-md-6">
              <h3 className="fw-bold text-center">Books & Publications</h3>
              <p>
                We publish research books, biographies, oral histories and more...
              </p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-danger mt-3"
                  onClick={() => openModal(sections.books)}
                >
                  Read Stories →
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <Image
                src="/img/hero-1.png"
                alt="Books"
                className="img-fluid rounded-3 shadow-sm"
                width={1500}
                height={300}
              />
            </div>
          </div>
        </div>
        {/* SECTION 3 */}
        <div className="container py-1 pb-3">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h3 className="fw-bold text-center">Story Archives</h3>
              <p>
                Explore personal documents, stories, interviews and rare
                memories...
              </p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-danger mt-3"
                  onClick={() => openModal(sections.archives)}
                >
                  Read Stories →
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <Image
                src="/img/hero-1.png"
                alt="Stories"
                className="img-fluid rounded-3 shadow-sm"
                width={1500}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
      {/* MODAL */}
      <div
        className="modal fade blog-modal-anim"
        id="storyModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4 shadow-lg">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">{selectedSection?.title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {selectedSection && (
                <>
                  <Image
                    src={selectedSection.img}
                    width={900}
                    height={500}
                    className="d-block w-100 rounded-3 mb-3"
                    alt="Section Image"
                  />
                  <p className="text-dark">{selectedSection.desc}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}