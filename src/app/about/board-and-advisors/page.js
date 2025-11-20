"use client";
import Image from "next/image";
import { useEffect } from "react";
export default function BoardAndAdvisor() {
  const team = [
    {
      id: 1,
      name: "R. Sriram",
      role: "Chairperson and Managing Trustee",
      img: "/img/hero-1.png",
      bio: "Short description for R. Sriram goes here...",
    },
    {
      id: 2,
      name: "Suzanne Singh",
      role: "Trustee",
      img: "/img/hero-1.png",
      bio: "Suzanne is the backbone of Indian literacy initiatives...",
    },
    {
      id: 3,
      name: "Ashok Kamath",
      role: "Trustee",
      img: "/img/hero-1.png",
      bio: "Ashok's bio goes here...",
    },
    {
      id: 4,
      name: "Meenakshi Ramesh",
      role: "Trustee",
      img: "/img/hero-1.png",
      bio: "Meenakshi's bio goes here...",
    },
    {
      id: 5,
      name: "Prof. M.S. Sriram",
      role: "Trustee",
      img: "/img/hero-1.png",
      bio: "Professor's bio goes here...",
    },
    {
      id: 6,
      name: "Srikrithi Nadhamuni",
      role: "Trustee",
      img: "/img/hero-1.png",
      bio: "Srikrithi's bio goes here...",
    },
    {
      id: 7,
      name: "Sumitra Pasupathy",
      role: "Advisor",
      img: "/img/hero-1.png",
      bio: "Sumitra's bio goes here...",
    },
  ];
  useEffect(() => {}, []);
  return (
    <div className="bg-style">
      <div className="container py-5">
        <h3 className="text-center mb-2">Get to know us</h3>
        <h2 className="text-center mb-5 fw-bold">
          Learn more about our Board of Trustees and Advisors
        </h2>
        <div className="row g-4 justify-content-center">
          {team.map((member) => (
            <div key={member.id} className="col-md-4 col-sm-6 text-center">
              {/* Profile */}
              <div className="p-3">
                <div className="member-photo mb-3">
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={180}
                    height={180}
                  />
                </div>
                <h5 className="fw-bold">{member.name}</h5>
                <p className="text-muted">{member.role}</p>
                {/* Accordion Trigger */}
                <button
                  className="btn btn-link fw-bold text-decoration-none"
                  data-bs-toggle="collapse"
                  data-bs-target={`#member-${member.id}`}
                >
                  VIEW
                </button>
                {/* Accordion Content */}
                <div
                  id={`member-${member.id}`}
                  className="accordion-collapse collapse mt-3"
                >
                  <div className="card card-body">
                    <p className="mb-0">{member.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}