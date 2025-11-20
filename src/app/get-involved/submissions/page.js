"use client";

export default function Submission() {
  return (
    <>
      <div className="bg-style">
        <div className="container py-5">
          <div className="row g-4">
            {/* CARD 1 */}
            <div className="col-md-6">
              <div className="custom-card p-4 rounded-4 h-100">
                <h3 className="fw-bold mb-3 text-center">WRITER</h3>
                <p>
                  Thirunar Archives documents voices, stories, and lived
                  experiences of the Thirunar (Transgender & Gender-diverse)
                  community. Submissions should be authentic,
                  community-centered, and respectful.
                </p>
                <ul>
                  <li>
                    Original personal narratives or documented experiences
                  </li>
                  <li>Community-based research writing</li>
                  <li>Articles on culture, identity, or history</li>
                  <li>Diverse perspectives from within the community</li>
                  <li>Fiction, non-fiction, essays, and creative writing</li>
                </ul>
                <h6 className="mt-4 fw-bold">Suggested Word Count:</h6>
                <ul>
                  <li>Short Stories: 300-800 words</li>
                  <li>Articles / Essays: 500-1500 words</li>
                  <li>Documented Narratives: 300-1200 words</li>
                </ul>
                <p className="mt-3 mb-0">
                  Submit writing to{" "}
                  <a href="mailto:submissions@thirunararchives.org">
                    submissions@thirunararchives.org
                  </a>
                </p>
              </div>
            </div>
            {/* CARD 2 */}
            <div className="col-md-6">
              <div className="custom-card p-4 rounded-4 h-100">
                <h3 className="fw-bold mb-3 text-center">ARTIST / ILLUSTRATOR</h3>
                <p>
                  Visual art helps preserve and celebrate Thirunar identity. We
                  welcome artwork that represents culture, activism, identity,
                  and lived experience in meaningful ways.
                </p>
                <ul>
                  <li>Send a link to your portfolio or 1-3 sample artworks</li>
                  <li>Low-resolution JPG/PNG submissions preferred</li>
                  <li>Illustrations, digital art, and mixed media accepted</li>
                  <li>
                    We review all submissions but may not respond immediately
                  </li>
                  <li>
                    Selected artists will be contacted for future collaborations
                  </li>
                </ul>
                <p className="mt-3 mb-0">
                  Submit artwork to{" "}
                  <a href="mailto:art@thirunararchives.org">
                    art@thirunararchives.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
