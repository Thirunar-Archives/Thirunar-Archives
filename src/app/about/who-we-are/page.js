"use client";
import Image from "next/image";
import Link from "next/link";

export default function WhoWeAre() {
  return (
    <>
      <div className="bg-style">
        <div className="container py-5">
          <div className="text-center">
            <h2 className="fw-bold mb-5 ">Who We Are</h2>
          </div>
          {/* WHO WE ARE SECTION */}
          <div className="row align-items-center g-4 mb-1">
            {/* Image */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4">
                <Image
                  src="/img/hero-1.png"
                  width={800}
                  height={600}
                  alt="Who we are"
                  className="img-fluid rounded"
                />
              </div>
            </div>
            {/* Content */}
            <div className="col-lg-6">
              <p className="text-muted">
                We are a community-driven organisation working to uplift and
                empower people through advocacy, support, education, and
                outreach programs. Our goal is to build a safe, inclusive and
                equal society for all.
              </p>
              <div className="d-flex justify-content-center">
                <Link href="/about/history" className="btn btn-danger mt-3 px-4">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <h2 className="fw-bold text-center mb-4">
            Our Values & Operating System
          </h2>
          <p className="text-center text-muted mb-5">
            These principles guide our work and help us serve the community with
            respect, dignity, and commitment.
          </p>
          <div className="row g-4 justify-content-center">
            {/* Card 1 */}
            <div className="col-md-4">
              <div className="value-card p-4 shadow-sm rounded bg-white h-100 text-center">
                <i className="icon fas fa-hand-holding-heart  mb-3 "></i>
                <h4 className="fw-bold mb-3">Compassion</h4>
                <p>
                  {" "}
                  We treat everyone with empathy and kindness. Our work is
                  rooted in respect and understanding.
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="col-md-4">
              <div className="value-card p-4 shadow-sm rounded bg-white h-100 text-center">
                <i className="icon fas fa-balance-scale  mb-3 "></i>
                <h4 className="fw-bold mb-3">Equality</h4>
                <p>
                  We believe everyone deserves equal rights, protection, and
                  opportunities.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="col-md-4">
              <div className="value-card p-4 shadow-sm rounded bg-white h-100 text-center">
                <i className="icon fas fa-users  mb-3 "></i>
                <h4 className="fw-bold mb-3">Community First</h4>
                <p>
                  Our programs uplift the community by working together and
                  supporting each other.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="support-section d-flex align-items-center">
          <div className="container text-center py-5">
            <h1 className="fw-semibold mb-3">Support our work</h1>
            <p className="text-muted mx-auto support-text">
              Help us empower lesbian, gay, bisexual, transgender and intersex
              communities in the Asia Pacific region.
            </p>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Link href="/donate" className="btn btn-danger px-4 py-2">
                Donate
              </Link>
              <Link href="/get-involved/volunteer" className="btn btn-primary px-4 py-2">
                Volunteer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
