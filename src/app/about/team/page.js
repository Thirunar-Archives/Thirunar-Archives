"use client"
import { useEffect } from "react";
import Image from "next/image";

export default function Team(){
   const team = [
    {
      id: 1,
      name: "John Doe",
      role: "Product Designer",
      img: "/img/hero-2.png",
      bio: "John leads design strategy and user experience for all products."
    },
    {
      id: 2,
      name: "Aisha Patel",
      role: "Frontend Engineer",
      img: "/img/hero-2.png",
      bio: "Aisha specializes in building fast, responsive, user-centric interfaces."
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Backend Developer",
      img: "/img/hero-2.png",
      bio: "Michael architects the system backend, API layers, and infrastructure."
    },
    {
      id: 4,
      name: "Sara Williams",
      role: "Marketing Lead",
      img: "/img/hero-2.png",
      bio: "Sara drives marketing campaigns, brand strategy, and outreach."
    },
    {
      id: 5,
      name: "David Kim",
      role: "Data Analyst",
      img: "/img/hero-2.png",
      bio: "David transforms raw data into insights and business decisions."
    },
    {
      id: 6,
      name: "David Kim",
      role: "Data Analyst",
      img: "/img/hero-2.png",
      bio: "David transforms raw data into insights and business decisions."
    }
  ];

  useEffect(() => {}, []);
  return (
   <div className="bg-style">
     <div className="container py-5">
      <h3 className="text-center mb-2">Meet Our Team</h3>
      <h2 className="text-center mb-5 fw-bold">
        The People Behind Our Work
      </h2>
      <div className="row g-4 justify-content-center">
        {team.map((member) => (
          <div key={member.id} className="col-md-4 col-sm-6 text-center">
            <div className="p-3">
              {/* Image */}
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
              {/* Accordion Button */}
              <button
                className="btn btn-link fw-bold text-decoration-none"
                data-bs-toggle="collapse"
                data-bs-target={`#team-${member.id}`}
              >
                VIEW 
              </button>
              {/* Accordion Content */}
              <div
                id={`team-${member.id}`}
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