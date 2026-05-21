"use client";
import Image from "next/image";
import { useEffect } from "react";
export default function BoardAndAdvisor() {
  const team = [
    {
      id: 1,
      name: "Poongodi Mathiarasu",
      role: "Founder cum Treasurer",
      img: "/img/Mathiarasu_Photo.png",
      bio: "Poongodi Mathiarasu is an independent theater artist and journalist from Trippur, Tamilnadu. His practice weaves folk trations, contemporary performance, and community-centred storytelling to engage with caste, gender, sexuality, and climate justice",
    },
    {
      id: 2,
      name: "Agni Pradeep",
      role: "Secretary",
      img: "/img/Agni_Photo.png",
      bio: "Agni Pradeep, originally from Salem district and based in Chennai, Tamilnadu, is a theater artist, poet, intersectionality practitioner and queer academician. She has published three poetry collections and is the publisher of Paalveli Pradhigal",
    },
    {
      id: 3,
      name: "Akshara M Sanal",
      role: "Trustee",
      img: "/img/Akshara_Photo.png",
      bio: "Akshara Sanal is a Chennai-based independent photo journalist from Kanyakumari, Tamilnadu. Her work keen on socio-political and cultural narratives, using visual storytelling to amplify underrespresental voices and document lived realities",
    },
    {
      id: 4,
      name: "Swetha Ashokraj ",
      role: "Trustee",
      img: "/img/Swetha_Photo.png",
      bio: "Swetha Ashokraj is a Chennai-based multidisciplinary artist and movement director.her practice uses heels dance as a tool for social transformation, centering Bahujan feminist perspectives and interrogating identity, culture and power.",
    },
    {
      id: 5,
      name: "Shamala",
      role: "Trustee",
      img: "/img/Shamala_Photo.png",
      bio: "Shamala is a folk dancer from Cuddalore , Tamilnadu, With over 20 years of performance experience. A kalai Valarmani awardee, she is the artistic director of Raja madhangi Thirunanganiyar kalai Kuzhu, a collective led by transwomen artistic.",
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