"use client";
import Blog from "@/app/about/blog/page";
import BoardAndAdvisor from "@/app/about/board-and-advisors/page";
import Team from "@/app/about/team/page";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import StoryCard from "../story-cards/page";
import Media from "@/app/media/page";

export default function WhatWeDo() {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function loadBS() {
      const bootstrap = await import(
        "bootstrap/dist/js/bootstrap.bundle.min.js"
      );
      window.bootstrap = bootstrap;
    }
    loadBS();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);

    setTimeout(() => {
      const modal = new window.bootstrap.Modal(
        document.getElementById("whatWeDoModal")
      );
      modal.show();
    }, 120);
  };

  // Updated Modal Data based on requirements
  const modalData = {
    arts: {
      title: "Arts, Culture & Creative Expression",
      desc: "We create platforms for marginalized communities to express, document, and share their lived experiences through art and culture. Our initiatives include theatre and puppetry workshops, literary development programs, art-based healing practices, and our annual public photo exhibition. These spaces foster creativity, storytelling, and critical dialogue while amplifying voices that are often excluded.",
      iconImg: "/img/art.PNG",
    },
    education: {
      title: "Education & Skill Development",
      desc: "We enable access to both formal and non-formal education through scholarships, mentorship, and structured learning support. Our programs include tutoring, digital literacy, internships, and skill-building initiatives that strengthen knowledge, confidence, and long-term employability.",
      iconImg: "/img/edu.PNG",
    },
    advocacy: {
      title: "Advocacy, Rights & Legal Support",
      desc: "We work towards systemic change through policy advocacy, social reform, and rights-based interventions. Our focus includes gender and sexual minority rights, workplace inclusion, employment equity, and providing legal education and free legal assistance to individuals facing discrimination.",
      iconImg: "/img/law.PNG",
    },
    health: {
      title: "Mental Health & Wellbeing",
      desc: "We promote holistic wellbeing through accessible mental health services, counselling, and community care initiatives. Our work includes health education, HIV/AIDS awareness, helplines, and wellness workshops that prioritize dignity, safety, and stigma-free support systems.",
      iconImg: "/img/health.PNG",
    },
    welfare: {
      title: "Community Support & Social Welfare",
      desc: "We provide direct, on-ground support for vulnerable populations through shelters, rehabilitation programs, deaddiction support, and crisis relief initiatives. Our work also extends to inclusive care for children, elders, and individuals in need of social protection.",
      iconImg: "/img/socialwel.PNG",
    },
    research: {
      title: "Research, Documentation & Livelihood Inclusion",
      desc: "We combine research, knowledge-building, and economic empowerment to create long-term impact. This includes archiving lived experiences, publishing queer literature, developing educational resources, and supporting livelihood through career guidance, job placement, and inclusive hiring partnerships.",
      iconImg: "/img/resour.PNG",
    },
  };

  return (
    <>
      <div className="bg-style">
        <div className="container py-5">
          {/* Page Title */}
          <div className="text-center mb-5">
            <h1 className="fw-bold">What We Do</h1>
            <p className="text-muted mt-2">
              Empowering LGBTQIA+ and marginalized communities through systemic change, 
              creative expression, and inclusive support systems.
            </p>
            <div className="mx-auto bg-danger mt-2" style={{ width: '60px', height: '4px' }}></div>
          </div>

          {/* Feature Cards Grid */}
          <div className="row g-4 justify-content-center">
            {Object.values(modalData).map((item, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="custom-card h-100 p-4 text-center d-flex flex-column align-items-center rounded-4 shadow-sm bg-white">
                  <div className="rounded-circle p-2 border border-danger border-2 mb-3 shadow-sm bg-light">
                    <Image 
                      src={item.iconImg} 
                      width={80} 
                      height={80} 
                      alt={item.title} 
                      className="rounded-circle"
                    />
                  </div>
                  <h5 className="fw-bold mb-3">{item.title}</h5>
                  <p className="text-muted small px-2">
                    {item.desc.substring(0, 110)}...
                  </p>
                  <button
                    className="btn btn-danger mt-auto w-100 fw-bold"
                    onClick={() => openModal(item)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-5">
            <h5 className="fw-semibold">Want to support our mission?</h5>
            <Link
              href="/get-involved/volunteer"
              className="btn btn-primary mt-3 px-5 py-2 fw-bold shadow-sm"
            >
              Become a Volunteer →
            </Link>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <div
        className="modal fade blog-modal-anim"
        id="whatWeDoModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4 shadow-lg border-0">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close ms-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="text-center px-4 pb-4">
              <div className="rounded-circle p-2 border border-danger border-2 d-inline-block mb-3 bg-light">
                <Image 
                  src={selectedItem?.iconImg || "/img/roots.PNG"} 
                  width={100} 
                  height={100} 
                  alt="Icon" 
                  className="rounded-circle"
                />
              </div>
              <h3 className="fw-bold">{selectedItem?.title}</h3>
              <div className="modal-body mt-3 text-start">
                <p className="text-dark leading-relaxed" style={{ fontSize: '1.1rem' }}>
                  {selectedItem?.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}