"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Blog() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function loadBootstrap() {
      const bootstrap = await import("bootstrap/dist/js/bootstrap.bundle.min.js");
      window.bootstrap = bootstrap;
    }
    loadBootstrap();
  }, []);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch("/api/blog", { cache: "no-store" });
      const data = await res.json();
      setBlogs(data || []);
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!window.bootstrap || blogs.length === 0) return;
    setTimeout(() => {
      document.querySelectorAll(".carousel").forEach((carousel) => {
        try {
          new window.bootstrap.Carousel(carousel, {
            interval: 2000,
            ride: "carousel",
            pause: false,
            wrap: true,
          });
        } catch (e) {
          console.warn("Carousel Init Error:", e);
        }
      });
    }, 200);
  }, [blogs]);

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    setTimeout(() => {
      const modal = new window.bootstrap.Modal(document.getElementById("blogModal"));
      modal.show();

      const modalCarousel = document.getElementById("modalCarousel");
      if (modalCarousel) {
        try {
          new window.bootstrap.Carousel(modalCarousel, {
            interval: 2000,
            ride: "carousel",
            pause: false,
            wrap: true,
          });
        } catch (e) {
          console.warn("Modal Carousel Error:", e);
        }
      }
    }, 150);
  };

  return (
    <>
      <style>{`
        .carousel-indicators [data-bs-target] {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.6);
        }
        .carousel-indicators .active {
          background-color: #1d4ed8;
        }
        @media (max-width: 768px) {
          .carousel-indicators {
            bottom: -10px;
          }
          .carousel-indicators [data-bs-target] {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>
      <div className="bg-style">
        <div className="container py-5">
          <h1 className="fw-bold text-center mb-5">Our Blog</h1>
          <div className="row g-4">
            {blogs.map((blog) => (
              <div className="col-lg-4 col-md-6" key={blog._id}>
                <div className="card border-0 shadow-lg h-100 rounded-4 overflow-hidden">
                  <div
                    id={`carousel-${blog._id}`}
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">
                      {blog.images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          data-bs-target={`#carousel-${blog._id}`}
                          data-bs-slide-to={i}
                          className={i === 0 ? "active" : ""}
                          aria-current={i === 0 ? "true" : undefined}
                          aria-label={`Slide ${i + 1}`}
                        ></button>
                      ))}
                    </div>
                    <div className="carousel-inner rounded-top-4">
                      {blog.images.map((img, i) => (
                        <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                          <Image src={img} width={600} height={400} className="d-block w-100" alt="Blog Image" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <h5 className="fw-bold">{blog.title}</h5>
                    <p>{blog.shortNote}</p>
                    <button className="btn btn-danger rounded-2 mt-2" onClick={() => openBlog(blog)}>
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="modal fade blog-modal-anim" id="blogModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4 shadow-lg">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">{selectedBlog?.title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedBlog && (
                <>
                  <div id="modalCarousel" className="carousel slide mb-3" data-bs-ride="carousel" data-bs-interval="2000">
                    <div className="carousel-indicators">
                      {selectedBlog.images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          data-bs-target="#modalCarousel"
                          data-bs-slide-to={i}
                          className={i === 0 ? "active" : ""}
                          aria-current={i === 0 ? "true" : undefined}
                          aria-label={`Slide ${i + 1}`}
                        ></button>
                      ))}
                    </div>
                    <div className="carousel-inner">
                      {selectedBlog.images.map((img, i) => (
                        <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                          <Image src={img} width={900} height={500} className="d-block w-100 rounded-3" alt="Blog Modal Image" />
                        </div>
                      ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#modalCarousel" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#modalCarousel" data-bs-slide="next">
                      <span className="carousel-control-next-icon"></span>
                    </button>
                  </div>
                </>
              )}
              <p className="text-dark">{selectedBlog?.longNote}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}