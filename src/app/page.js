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
                <div className="mx-auto bg-danger mt-2" style={{ width: '50px', height: '3px' }}></div>
              </div>

              <div className="row text-center g-4">
                <div className="col-md-4 mb-4">
                  <div className="p-4 bg-white border rounded shadow-sm h-100">
                    <div className="mb-3">
                      <Image src="/img/roots.PNG" width={70} height={70} alt="Reclaim" />
                    </div>
                    <h5 className="fw-bold mb-3">Reclaim Erased Histories and Recognise Labour</h5>
                    <p className="text-muted small">Across histories and geographies, LGBTQIA+ communities and many other marginalized identities have existed with richness and resilience. Thirunar Archives exists to reclaim these histories and recognise these labours.</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="p-4 bg-white border rounded shadow-sm h-100">
                    <div className="mb-3">
                      <Image src="/img/hands.PNG" width={70} height={70} alt="Resistance" />
                    </div>
                    <h5 className="fw-bold mb-3">Archiving as an Act of Resistance and Care</h5>
                    <p className="text-muted small">We believe archiving is not just preservation; it is an act of resistance and care. By documenting personal stories, we build a space where diverse lives are not only remembered but valued.</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="p-4 bg-white border rounded shadow-sm h-100">
                    <div className="mb-3">
                      <Image src="/img/community.PNG" width={70} height={70} alt="Justice" />
                    </div>
                    <h5 className="fw-bold mb-3">Challenge, Converse, Imagine Justice</h5>
                    <p className="text-muted small">The archive challenges transphobia, homophobia, and caste-based discrimination, while opening conversations about identity, coexistence, dignity, and justice.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-5 bg-light">
            <div className="container">
              <div className="row g-0 rounded-4 overflow-hidden shadow-lg">
                <div className="col-md-6 bg-dark text-white p-5 d-flex flex-column justify-content-center">
                  <div className="mb-4">
                    <Image src="/img/eye.png" width={80} height={80} alt="Vision Icon" className="rounded-circle border border-danger border-2 p-1 bg-white" />
                  </div>
                  <h3 className="fw-bold mb-4 text-uppercase tracking-wider" style={{ color: '#dc3545' }}>Our Vision</h3>
                  <p className="fs-4 lh-base italic">"To create a world where LGBTQIA+ lives, human diversity, and their labour are visible, valued, and woven into collective memory and cultural narratives."</p>
                </div>
                <div className="col-md-6 bg-white text-dark p-5 d-flex flex-column justify-content-center border-start">
                  <div className="mb-4">
                    <Image src="/img/mission.png" width={80} height={80} alt="Mission Icon" className="rounded-circle border border-danger border-2 p-1 bg-light" />
                  </div>
                  <h3 className="fw-bold mb-4 text-uppercase tracking-wider text-danger">Our Mission</h3>
                  <ul className="list-unstyled fs-6">
                    <li className="mb-2">● To document and preserve LGBTQIA+ histories and labour.</li>
                    <li className="mb-2">● To create accessible platforms for storytelling and art.</li>
                    <li className="mb-2">● To challenge discrimination and the invisibilisation of labour.</li>
                    <li className="mb-2">● To build connections across communities and generations.</li>
                    <li>● To advocate for dignity and recognition of diversity.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="py-5 mb-0">
            <div className="container text-center">
              <h2 className="fw-bold mb-5">Your Contribution Will- </h2>
              <div className="row justify-content-center">
                <div className="col-md-4 mb-4">
                  <Image src="/img/h1.jpg" alt="Preserve" width={500} height={350} className="img-fluid rounded shadow-sm" />
                  <p className="mt-3 fw-semibold">Preserve Community Histories <br /> and Personal Narratives</p>
                </div>
                <div className="col-md-4 mb-4">
                  <Image src="/img/P1025455-jpg.jpg" alt="Empower" width={500} height={350} className="img-fluid rounded shadow-sm" />
                  <p className="mt-3 fw-semibold">Support Documentation of <br /> Cultural & Social Movements</p>
                </div>
                <div className="col-md-4 mb-4">
                  <Image src="/img/i3.jpg" alt="LGBTQIA+" width={500} height={350} className="img-fluid rounded shadow-sm" />
                  <p className="mt-3 fw-semibold">Empower LGBTQIA+ Voices <br /> through Archival Preservation</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-5 bg-light">
            <div className="container">
              <h2 className="text-center mb-5 fw-bold">Frequently Asked Questions</h2>
              <div className="accordion" id="faqAccordion">
                {/* Q1 */}
                <div className="accordion-item shadow-sm mb-2 border-0 rounded-3 overflow-hidden">
                  <h2 className="accordion-header" id="faqOne">
                    <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                      What is Thirunar Archives?
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">Thirunar Archives is a digital archive platform preserving history, stories, and resources of the Thirunar community.</div>
                  </div>
                </div>
                {/* Q2 */}
                <div className="accordion-item shadow-sm mb-2 border-0 rounded-3 overflow-hidden">
                  <h2 className="accordion-header" id="faqTwo">
                    <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                      What kind of content does the archive include?
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">The archive includes articles, photos, documents, interviews, research materials, and community stories.</div>
                  </div>
                </div>
                {/* Q3 */}
                <div className="accordion-item shadow-sm mb-2 border-0 rounded-3 overflow-hidden">
                  <h2 className="accordion-header" id="faqThree">
                    <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                      How can I contribute to the archives?
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">You can contribute by submitting documents, photos, stories, or verified information through our submission section.</div>
                  </div>
                </div>
                {/* Q4 */}
                <div className="accordion-item shadow-sm mb-2 border-0 rounded-3 overflow-hidden">
                  <h2 className="accordion-header" id="faqFour">
                    <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                      Is the content free to access?
                    </button>
                  </h2>
                  <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">Yes, all public content is free to read. Some verified documents may require special access.</div>
                  </div>
                </div>
                <div className="accordion-item shadow-sm mb-2 border-0 rounded-3 overflow-hidden">
                  <h2 className="accordion-header" id="faqFive">
                    <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">
                      How often is new content added?
                    </button>
                  </h2>
                  <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">New content is added regularly based on community contributions and research updates from our team.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-5 bg-white">
            <div className="container">
              <h2 className="text-center fw-bold mb-5">Explore Categories</h2>
              <div className="row g-4">
                {[
        { label: "Board of Trustees", link: "/about/board-and-advisors", icon: "/img/boardT.PNG" },
                  { label: "Vision & Mission", link: "/about/vision-mission", icon: "/img/eye.PNG" },
                  { label: "Blogs", link: "/about/blog", icon: "/img/blog.PNG" },
                  { label: "Events", link: "/events", icon: "/img/event.PNG" },
                  { label: "Media", link: "/media", icon: "/img/media.PNG" },
                  { label: "Awards", link: "/about/awards", icon: "/img/awards.PNG" },
                ].map((item, i) => (
                  <div key={i} className="col-6 col-md-4">
                    <Link href={item.link} className="text-decoration-none">
                      <div className="card h-100 shadow-sm border-0 text-center p-4 bg-light category-hover-card">
                        <div className="mb-3 d-flex justify-content-center">
                          <div className="rounded-circle p-2 border border-danger border-2 bg-white">
                            <Image src={item.icon} width={60} height={60} alt={item.label} className="rounded-circle" />
                          </div>
                        </div>
                        <h5 className="fw-bold text-dark">{item.label}</h5>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <style jsx>{`
        .category-hover-card:hover { background-color: #f8d7da !important; transform: translateY(-8px); transition: 0.3s; }
        .italic { font-style: italic; }
        .tracking-wider { letter-spacing: 0.15rem; }
      `}</style>
    </>
  );
}