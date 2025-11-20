"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blog() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  // FIX bootstrap undefined error
  useEffect(() => {
    async function loadBootstrap() {
      const bootstrap = await import("bootstrap/dist/js/bootstrap.bundle.min.js");
      window.bootstrap = bootstrap; // store globally

      // Initialize all carousels
      document.querySelectorAll(".carousel").forEach((carousel) => {
        new window.bootstrap.Carousel(carousel, {
          interval: 1500,
          ride: "carousel",
          pause: false,
          wrap: true,
        });
      });
    }
    loadBootstrap();
  }, []);

  // Blog Data
  const blogs = [
    {
      id: 1,
      title: "Amazing Book Collection",
      short: "We have curated two books for the reading month...",
      long:
        "This is the detailed full description of the blog. You can write unlimited content here...",
      images: ["/img/hero-1.png", "/img/hero-2.png", "/img/hero-1.png"],
    },
    {
      id: 2,
      title: "Children’s Reading Week",
      short: "Introducing new books curated for daily reading...",
      long:
        "This month we focus on building consistent reading habits in children...",
      images: ["/img/hero-1.png", "/img/hero-2.png", "/img/hero-1.png"],
    },
    {
      id: 3,
      title: "Festival Special Stories",
      short: "Explore inspiring festival-themed stories...",
      long:
        "During the festival month, children get to explore stories full of culture and values...",
      images: ["/img/hero-1.png", "/img/hero-2.png", "/img/hero-1.png"],
    },
  ];

  // Open Modal Function
  const openBlog = (blog) => {
    setSelectedBlog(blog);

    setTimeout(() => {
      const modal = new window.bootstrap.Modal(document.getElementById("blogModal"));
      modal.show();
    }, 150);
  };

  return (
    <>
      <div className="bg-style">
        <div className="container py-5">
          <h1 className="fw-bold text-center mb-5">Our Blog</h1>

          <div className="row g-4">
            {blogs.map((blog, index) => (
              <div className="col-lg-4 col-md-6" key={blog.id}>
                <div className="card border-0 shadow-lg h-100 rounded-4 overflow-hidden">

                  {/* Carousel */}
                  <div
                    id={`carousel-${index}`}
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                    data-bs-interval="1500"
                  >
                    <div className="carousel-inner rounded-top-4">
                      {blog.images.map((img, i) => (
                        <div
                          key={i}
                          className={`carousel-item ${i === 0 ? "active" : ""}`}
                        >
                          <Image
                            src={img}
                            width={600}
                            height={400}
                            className="d-block w-100"
                            alt="Blog Image"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body p-4">
                    <h5 className="fw-bold">{blog.title}</h5>
                    <p>{blog.short}</p>

                    <button
                      className="btn btn-danger rounded-2 mt-2"
                      onClick={() => openBlog(blog)}
                    >
                      Read More
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/** MODAL WITH FADE + SLIDE-UP ANIMATION **/}
      <div
        className="modal fade blog-modal-anim"
        id="blogModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4 shadow-lg">

            <div className="modal-header">
              <h5 className="modal-title fw-bold">{selectedBlog?.title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              {selectedBlog && (
                <div
                  id="modalCarousel"
                  className="carousel slide mb-3"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {selectedBlog.images.map((img, i) => (
                      <div
                        key={i}
                        className={`carousel-item ${i === 0 ? "active" : ""}`}
                      >
                        <Image
                          src={img}
                          width={900}
                          height={500}
                          className="d-block w-100 rounded-3"
                          alt="Blog Modal Image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-dark">{selectedBlog?.long}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}