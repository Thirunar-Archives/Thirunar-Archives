"use client";
import Image from "next/image";

export default function Awards() {
  return (
    <div className="bg-style">
      <div className="container py-5">
        <div className="row align-items-center g-4 mb-1">
          {/* Image */}
          <div className="col-lg-6">
            <div className="card  border-0 shadow-sm rounded-4">
              <Image
                src="/img/hero-2.png"
                width={800}
                height={600}
                alt="Awards"
                className="img-fluid rounded"/>
            </div>
          </div>
          {/* Content */}
          <div className="col-lg-6">
            <h1 className="text-center mb-5">Awards</h1>
            <p className="text-muted">
              We are a community-driven organisation working to uplift and
              empower people through advocacy, support, education, and outreach
              programs. Our goal is to build a safe, inclusive and equal society
              for all.
            </p>
          </div>
        </div>
      </div>
      <div className="container py-5">
        <div className="year-section mb-3 rounded-4">
          <div className="row g-4 ">
            <div className="col-md-6 col-lg-12">
              <div className="award-card ">
                <div className="year-badge">2024-25</div>
                <div className="d-flex mt-3">
                  <div>
                    <h5 className="award-header mt-2">Awards:</h5>
                    <ul className="award-list">
                      <li>Library of Congress Literacy Awards</li>
                      <li>Winner in the International Prize</li>
                      <li>Recognized for literacy excellence</li>
                    </ul>
                  </div>
                  <div className="right-award">
                    <h5 className="award-header mt-2">Awards:</h5>
                    <ul className="award-list">
                      <li>Library of Congress Literacy Awards</li>
                      <li>Winner in the International Prize</li>
                      <li>Recognized for literacy excellence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="year-section mb-3">
          <div className="row g-4 rounded-4">
            <div className="col-md-6 col-lg-12">
              <div className="award-card ">
                <div className="year-badge">2024-25</div>
                 <div className="d-flex mt-3">
                  <div>
                    <h5 className="award-header mt-2">Awards:</h5>
                    <ul className="award-list">
                      <li>Library of Congress Literacy Awards</li>
                      <li>Winner in the International Prize</li>
                      <li>Recognized for literacy excellence</li>
                    </ul>
                  </div>
                  <div className="right-award">
                    <h5 className="award-header mt-2">Awards:</h5>
                    <ul className="award-list">
                      <li>Library of Congress Literacy Awards</li>
                      <li>Winner in the International Prize</li>
                      <li>Recognized for literacy excellence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="year-section mb-3">
          <div className="row g-4 rounded-4">
            <div className="col-md-6 col-lg-12">
              <div className="award-card ">
                <div className="year-badge">2024-25</div>
                <div className="d-flex mt-3">
                  <div>
                    <h5 className="award-header mt-2 mb-2">Awards:</h5>
                    <ul className="award-list">
                      <li>Library of Congress Literacy Awards</li>
                      <li>Winner in the International Prize</li>
                      <li>Recognized for literacy excellence</li>
                    </ul>
                  </div>
                  <div className="right-award">
                    <h5 className="award-header mt-2">Awards:</h5>
                    <ul className="award-list">
                      <li>Library of Congress Literacy Awards</li>
                      <li>Winner in the International Prize</li>
                      <li>Recognized for literacy excellence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="year-section mb-3">
          <div className="row g-4 rounded-4">
            <div className="col-md-6 col-lg-12">
              <div className="award-card ">
                <div className="year-badge">2024-25</div>
                <div className="d-flex mt-3">
                  <div>
                    <h5 className="award-header mt-2">Awards:</h5>
                    <ul className="award-list">
                      <li>Library of Congress Literacy Awards</li>
                      <li>Winner in the International Prize</li>
                      <li>Recognized for literacy excellence</li>
                    </ul>
                  </div>
                  <div className="right-award">
                    <h5 className="award-header mt-2">Awards:</h5>
                    <ul className="award-list">
                      <li>Library of Congress Literacy Awards</li>
                      <li>Winner in the International Prize</li>
                      <li>Recognized for literacy excellence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="year-section">
          <div className="row g-4 rounded-4">
            <div className="col-md-6 col-lg-6">
              <div className="award-card ">
                <div className="year-badge">2023-24</div>
                <h5 className="award-header mt-3">Awards:</h5>
                <ul className="award-list">
                  <li>Library of Congress Literacy Awards</li>
                  <li>Winner in the International Prize</li>
                  <li>Recognized for literacy excellence</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="award-card ">
                <div className="year-badge">2023-24</div>
                <h5 className="award-header mt-3">Awards:</h5>
                <ul className="award-list">
                  <li>Library of Congress Literacy Awards</li>
                  <li>Winner in the International Prize</li>
                  <li>Recognized for literacy excellence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}