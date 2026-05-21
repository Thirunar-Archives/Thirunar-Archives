"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Media() {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [publications, setPublications] = useState([]);
  // Fetch all media dynamically
  const loadMedia = async () => {
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      if (!data.success) return;
      const all = data.data;
      setPhotos(all.filter((m) => m.type === "photo"));
      setVideos(all.filter((m) => m.type === "video"));
      setPublications(all.filter((m) => m.type === "publication"));
    } catch (err) {
      console.error("Failed to load media", err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await loadMedia();
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-style">
        <div className="container py-5">
          {/* Page Header */}
          <div className="text-center mb-5">
            <h1 className="fw-bold mb-5">Media & Archives</h1>
            <p className="text-muted fs-5">
              Documenting the voices, history and lived experiences of Thirunar
              / Transgender communities.
            </p>
          </div>
          {/* Photo Archive Section */}
          <section className="mb-5">
            <h3 className="mb-4 text-center">Photo Archives</h3>
            <div className="row g-4">
              {photos.map((item) => (
                <div className="col-md-4" key={item._id}>
                  <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      width={500}
                      height={300}
                      alt={item.title}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text text-muted">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Show fallback if no photos */}
              {photos.length === 0 && (
                <p className="text-center text-muted">No photos available.</p>
              )}
            </div>
          </section>
          {/* Video Section */}
          <section className="mb-5">
            <h3 className="mb-4 text-center">Featured Videos</h3>
            <div className="row g-4">
              {videos.map((item) => (
                <div className="col-md-6" key={item._id}>
                  <div className="ratio ratio-16x9 rounded-4 overflow-hidden border">
                    <iframe
                      src={item.videoUrl.replace("watch?v=", "embed/")}
                      title={item.title}
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="mt-2 fw-semibold">{item.title}</p>
                </div>
              ))}
              {videos.length === 0 && (
                <p className="text-center text-muted">No videos available.</p>
              )}
            </div>
          </section>
          {/* Publications Section */}
          <section className="mb-5">
            <h3 className="mb-4 text-center">Publications & Reports</h3>
            <ul className="list-group shadow-sm rounded-4 overflow-hidden border">
              {publications.map((item) => (
                <li className="list-group-item" key={item._id}>
                  <strong>{item.title}</strong>
                  <br />
                  <span className="text-muted">{item.description}</span>
                </li>
              ))}
              {publications.length === 0 && (
                <li className="list-group-item text-muted text-center">
                  No publications found.
                </li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}