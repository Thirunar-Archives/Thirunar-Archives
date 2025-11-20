"use client";
import Image from "next/image";

export default function Media() {
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
              {/* Card 1 */}
              <div className="col-md-4">
                <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
                  <Image
                    src="/img/hero-1.png"
                    width={500}
                    height={300}
                    alt="Pride Event"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Pride March 2024</h5>
                    <p className="card-text text-muted">
                      Moments from the historic Thirunar representation in
                      Chennai Pride 2024.
                    </p>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className="col-md-4">
                <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
                  <Image
                    src="/img/hero-2.png"
                    width={500}
                    height={300}
                    alt="Community Meet"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Community Gathering</h5>
                    <p className="card-text text-muted">
                      A safe space meetup for Thirunar youths to connect,
                      express and share stories.
                    </p>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="col-md-4">
                <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
                  <Image
                    src="/img/hero-1.png"
                    width={500}
                    height={300}
                    alt="Training Workshop"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Skill Development Workshop</h5>
                    <p className="card-text text-muted">
                      Empowering trans individuals through digital literacy and
                      leadership programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Video Section */}
          <section className="mb-5">
            <h3 className="mb-4 text-center">Featured Videos</h3>
            <div className="row g-4">
              {/* Video 1 */}
              <div className="col-md-6">
                <div className="ratio ratio-16x9 rounded-4 overflow-hidden border">
                  <iframe
                    src="https://www.youtube.com/embed/yourVideoID2"
                    title="Thirunar Stories"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="mt-2 fw-semibold">
                  Documentary: Voices of Thirunar Community
                </p>
              </div>
              {/* Video 2 */}
              <div className="col-md-6">
                <div className="ratio ratio-16x9 rounded-4 overflow-hidden border">
                  <iframe
                    src="https://www.youtube.com/embed/yourVideoID2"
                    title="Pride Event"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="mt-2 fw-semibold">
                  Pride 2024 - Behind The Scenes
                </p>
              </div>
            </div>
          </section>
          {/* Publications Section */}
          <section className="mb-5">
            <h3 className="mb-4 text-center">Publications & Reports</h3>
            <ul className="list-group shadow-sm rounded-4 overflow-hidden border">
              <li className="list-group-item">
                <strong>Thirunar Oral Histories - Volume 1</strong>
                <br />
                <span className="text-muted">
                  A collection of interviews documenting lived transgender
                  experiences in Tamil Nadu.
                </span>
              </li>
              <li className="list-group-item">
                <strong>Annual Report 2024: Inclusion & Change</strong>
                <br />
                <span className="text-muted">
                  An overview of community initiatives and social development
                  projects.
                </span>
              </li>
              <li className="list-group-item">
                <strong>Trans Rights Movement Timeline - India</strong>
                <br />
                <span className="text-muted">
                  Chronological documentation of the struggle and achievements
                  of the trans community.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}