"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link";

export default function HomeLayout() {
  return (
    <>
      <div className="bg-style">
        <div className="container-fluid p-0">
          <section className="py-5">
            <div className="container">
              <div className="text-center mb-5">
                <h2 className="fw-bold">Why Thirunar Archives Exists</h2>
                <p className="text-muted">
                  Preserving the cultural, historical, and lived experiences of
                  the Thirunar community.
                </p>
              </div>
              <div className="row text-center">
                <div className="col-md-4 mb-4 ">
                  <div className="p-4 bg-white-smoke border rounded shadow-sm">
                    <h5 className="fw-semibold mb-2">
                      Protect Community Memory
                    </h5>
                    <p className="text-muted small">
                      We safeguard stories that are often erased or forgotten,
                      ensuring future generations can learn and remember.
                    </p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="p-4 bg-white-smoke border rounded shadow-sm">
                    <h5 className="fw-semibold mb-2">
                      Document Social Movements
                    </h5>
                    <p className="text-muted small">
                      From protests to pride gatherings, we archive materials
                      that reflect decades of community activism.
                    </p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="p-4 bg-white-smoke border rounded-3 shadow-sm">
                    <h5 className="fw-semibold mb-2">
                      Preserve Photos & Oral Stories
                    </h5>
                    <p className="text-muted small">
                      Photos, letters, artwork, and audio stories are collected
                      with respect and preserved for long-term access.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-5 mb-0">
            <div className="container text-center">
              {/* Heading */}
              <h2 className="fw-bold mb-5">Your Contribution Will- </h2>
              <div className="row justify-content-center">
                {/* Card 1 */}
                <div className="col-md-4 mb-4">
                  <Image
                    src="/img/hero-1.png"
                    alt="Preserve Community Memories"
                    width={500}
                    height={350}
                    className="img-fluid rounded shadow-sm"
                  />
                  <p className="mt-3 fw-semibold">
                    Preserve Community Histories <br /> and Personal Narratives
                  </p>
                </div>
                {/* Card 2 */}
                <div className="col-md-4 mb-4">
                  <Image
                    src="/img/hero-2.png"
                    alt="Empower Researchers"
                    width={500}
                    height={350}
                    className="img-fluid rounded shadow-sm"
                  />
                  <p className="mt-3 fw-semibold">
                    Support Documentation of <br /> Cultural & Social Movements
                  </p>
                </div>
                {/* Card 3 */}
                <div className="col-md-4 mb-4">
                  <Image
                    src="/img/hero-1.png"
                    alt="LGBTQIA+ Support"
                    width={500}
                    height={350}
                    className="img-fluid rounded shadow-sm"
                  />
                  <p className="mt-3 fw-semibold">
                    Empower LGBTQIA+ Voices <br /> through Archival Preservation
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="py-5">
            <div className="container">
              <h2 className="text-center mb-4 fw-bold">
                Frequently Asked Questions
              </h2>
              <div className="accordion" id="faqAccordion">
                {/* Q1 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faqOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                    >
                      What is Thirunar Archives?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Thirunar Archives is a digital archive platform preserving
                      history, stories, and resources of the Thirunar community.
                    </div>
                  </div>
                </div>
                {/* Q2 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faqTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                    >
                      What kind of content does the archive include?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      The archive includes articles, photos, documents,
                      interviews, research materials, and community stories.
                    </div>
                  </div>
                </div>
                {/* Q3 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faqThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                    >
                      How can I contribute to the archives?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      You can contribute by submitting documents, photos,
                      stories, or verified information through our submission
                      section.
                    </div>
                  </div>
                </div>
                {/* Q4 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faqFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                    >
                      Is the content free to access?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Yes, all public content is free to read. Some verified
                      documents may require special access.
                    </div>
                  </div>
                </div>
                {/* Q5 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faqFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                    >
                      How often is new content added?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      New content is added regularly based on community
                      contributions and research updates from our team.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Categories Section */}
          <section className="py-5">
            <div className="container">
              <h2 className="text-center fw-bold mb-5">Explore Categories</h2>
              <div className="row g-4">
                {[
                  {
                    label: "Board and Advisors",
                    link: "/about/board-and-advisors",
                  },
                  { label: "Team", link: "/about/team" },
                  { label: "Events", link: "/events" },
                  { label: "Awards", link: "/about/awards" },
                  { label: "Media", link: "/media" },
                  { label: "Blog", link: "/about/blog" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="col-6 col-md-4 animate__animated animate__zoomIn"
                  >
                    <Link href={item.link} className="text-decoration-none">
                      <div className="card home-card h-100 shadow-sm border-0 text-center p-4">
                        <h4 className="fw-bold">{item.label}</h4>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
