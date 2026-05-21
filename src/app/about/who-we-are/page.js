"use client";
import Image from "next/image";
import Link from "next/link";

export default function WhoWeAre() {
  return (
    <>
      <div className="bg-style">
        {/* HERO SECTION */}
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Who We Are</h2>
            <div className="mx-auto bg-danger" style={{ width: '60px', height: '4px' }}></div>
          </div>

          <div className="row align-items-center g-5 mb-5">
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <Image
                  src="/img/hero-1.png" 
                  width={800}
                  height={1000}
                  alt="Thirunar Archives"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="ps-lg-4 text-dark">
                
                <p className="mb-4">
                  <strong>Thirunar Archives</strong> is a community-led initiative dedicated to documenting, preserving, and amplifying the lived experiences, histories, cultural expressions, and labour of LGBTQIA+ communities and the wider spectrum of human diversity.
                </p>
                
                <p className="mb-4">
                  Rooted in grassroots practices, the archive emerges from lived realities—ensuring that narratives are held with authenticity, dignity, and agency. While the word <i>Thirunar</i> carries deep cultural significance connected to trans identities in Tamil contexts, the archive expands beyond boundaries to embrace all forms of gender, sexuality, and human difference.
                </p>

                <p className="mb-4">
                  We recognise that identity is deeply tied to <strong>labour</strong>—whether visible or invisible, artistic or survival-based, emotional or physical. Our work holds space for these layered realities.
                </p>

                <p className="mb-4">
                  At the intersection of art, memory, activism, and labour, we bring together photography, oral histories, performance, and documentation to create a <strong>living archive</strong> Through this, we challenge erasure, disrupt dominant narratives, and create spaces for visibility, solidarity, and belonging.
                </p>

                <div className="d-flex justify-content-start mt-4">
                  <Link href="/about/history" className="btn btn-danger px-4 py-2 fw-bold shadow-sm">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NARRATIVE SECTION WITH YOUR LINKED IMAGES */}
        <div className="container py-5 bg-white rounded-5 shadow-sm my-5">
          <div className="row g-4 px-3 justify-content-center">
            
            {/* Item 1: Community Initiative */}
            <div className="col-md-6 col-lg-3">
              <div className="text-center p-3">
                <Image src="/img/community.PNG" width={80} height={80} alt="Community" className="mb-3" />
                <h6 className="fw-bold text-dark">Community-Led</h6>
                <p className="small text-muted">Dedicated to documenting lived experiences and cultural expressions.</p>
              </div>
            </div>

            {/* Item 2: Roots/Grassroots */}
            <div className="col-md-6 col-lg-3">
              <div className="text-center p-3">
                <Image src="/img/roots.PNG" width={80} height={80} alt="Roots" className="mb-3" />
                <h6 className="fw-bold text-dark">Grassroots Practice</h6>
                <p className="small text-muted">Rooted in grassroots practices ensuring authenticity and agency.</p>
              </div>
            </div>

            {/* Item 3: Labour & Identity */}
            <div className="col-md-6 col-lg-3">
              <div className="text-center p-3">
                <Image src="/img/hands.PNG" width={80} height={80} alt="Labour" className="mb-3" />
                <h6 className="fw-bold text-dark">Identity & Labour</h6>
                <p className="small text-muted">Recognising identity is deeply tied to labour—visible or invisible.</p>
              </div>
            </div>

            {/* Item 4: Living Archive */}
            <div className="col-md-6 col-lg-3">
              <div className="text-center p-3">
                <Image src="/img/camera.PNG" width={80} height={80} alt="Archive" className="mb-3" />
                <h6 className="fw-bold text-dark">Living Archive</h6>
                <p className="small text-muted">Bringing together photography and oral histories to create a living archive.</p>
              </div>
            </div>

          </div>
        </div>

        {/* SUPPORT SECTION */}
        <div className="container text-center py-5 my-5 border-top">
          <h1 className="fw-bold mb-3">Support our work</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Support our efforts to challenge erasure and strengthen LGBTQIA+ communities across India[cite: 1].
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link href="/Donate" className="btn btn-danger px-5 py-2 fw-bold">Donate</Link>
            <Link href="/get-involved/volunteer" className="btn btn-primary px-5 py-2 fw-bold">Volunteer</Link>
          </div>
        </div>
      </div>
    </>
  );
}