"use client";
import Blog from "@/app/about/blog/page";
import BoardAndAdvisor from "@/app/about/board-and-advisors/page";
import Team from "@/app/about/team/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import StoryCard from "../story-cards/page";
import Media from "@/app/media/page";

export default function WhatWeDo() {
  const [selectedItem, setSelectedItem] = useState(null);

  // Load Bootstrap JS once
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

  // Dynamic Modal Data
  const modalData = {
    support: {
      title: "Community Support",
      desc:
        "We help individuals access essential resources, provide guidance, support groups, crisis assistance, " +
        "and local community programs designed to uplift those in vulnerable situations.",
      icon: "fa-solid fa-handshake",
    },
    advocacy: {
      title: "Advocacy",
      desc:
        "We work closely with community leaders, policymakers, and activists to promote equal rights, fight " +
        "discrimination, and boost public awareness through campaigns, workshops, and social change programs.",
      icon: "fa-solid fa-user",
    },
    health: {
      title: "Health & Wellness",
      desc:
        "We conduct health check-ups, mental wellness counseling, fitness events, and awareness sessions to ensure " +
        "holistic health for the community.",
      icon: "fa-solid fa-heart",
    },
    education: {
      title: "Education Programs",
      desc:
        "Our training programs, workshops, and development courses help improve skills, boost employability, " +
        "and empower youth and community groups.",
      icon: "fa-solid fa-book-open",
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
              We work to support, empower and uplift the community through
              multiple social-impact programs.
            </p>
          </div>
          {/* Feature Cards */}
          <div className="row g-4 justify-content-center">
            {/* Card 1 */}
            <div className="col-md-6 col-lg-4">
              <div className="custom-card h-100 p-3">
                <div className="d-flex flex-column align-items-center text-center">
                  <i className="fa-solid fa-handshake icon"></i>
                  <h4 className="mt-3 mb-0">Community Support</h4>
                </div>
                <p className="mt-2">
                  We provide essential support services and help individuals
                  access vital community resources.
                </p>
                <button
                  className="btn btn-danger mt-auto"
                  onClick={() => openModal(modalData.support)}
                >
                  Learn More
                </button>
              </div>
            </div>
            {/* Card 2 */}
            <div className="col-md-6 col-lg-4">
              <div className="custom-card h-100 p-3">
                <div className="d-flex flex-column align-items-center text-center">
                  <i className="fa-solid fa-user icon"></i>
                  <h4 className="mt-3">Advocacy</h4>
                </div>
                <p>
                  We push for policy reform and raise awareness on vital
                  community issues.
                </p>
                <button
                  className="btn btn-danger mt-auto"
                  onClick={() => openModal(modalData.advocacy)}
                >
                  Learn More
                </button>
              </div>
            </div>
            {/* Card 3 */}
            <div className="col-md-6 col-lg-4">
              <div className="custom-card h-100 p-3">
                <div className="d-flex flex-column align-items-center text-center">
                  <i className="fa-solid fa-heart icon"></i>
                  <h4 className="mt-3">Health & Wellness</h4>
                </div>
                <p>
                  We conduct workshops, check-ups, and counseling sessions to
                  support well-being.
                </p>
                <button
                  className="btn btn-danger mt-auto"
                  onClick={() => openModal(modalData.health)}
                >
                  Learn More
                </button>
              </div>
            </div>
            {/* Card 4 */}
            <div className="col-md-6 col-lg-4">
              <div className="custom-card h-100 p-3">
                <div className="d-flex flex-column align-items-center text-center">
                  <i className="fa-solid fa-book-open icon"></i>
                  <h4 className="mt-3">Education Programs</h4>
                </div>
                <p>
                  Training, skill development, and awareness sessions to empower
                  youth & community groups.
                </p>
                <button
                  className="btn btn-danger mt-auto"
                  onClick={() => openModal(modalData.education)}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          {/* CTA */}
          <div className="text-center mt-5">
            <h5 className="fw-semibold">Want to support our mission?</h5>
            <Link
              href="/get-involved/volunteer"
              className="btn btn-primary mt-3 px-4"
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
          <div className="modal-content rounded-4 shadow-lg">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close ms-auto"
                data-bs-dismiss="modal"
              ></button>
            </div>
            {/* Centered Icon + Title */}
            <div className="text-center px-4">
              <i
                className={`${selectedItem?.icon} icon mb-3`}
                style={{ fontSize: "40px" }}
              ></i>
              <h3 className="fw-bold">{selectedItem?.title}</h3>
            </div>
            <div className="modal-body mt-3">
              <p className="text-dark">{selectedItem?.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}




Blog
BoardAndAdvisor
Team
StoryCard
Event
Media