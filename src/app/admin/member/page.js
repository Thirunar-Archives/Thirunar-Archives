"use client";
import Image from "next/image";

export default function MemberPage() {
    const team = [
    {
      id: 1,
      name: "John Doe",
      role: "Product Designer",
      img: "/img/hero-2.png",
      bio: "John leads design strategy and user experience for all products."
    },]
  return (
    <>
      <div className="bg-style">
        <div className="container py-5">
          <h1 className="mb-5 text-center fw-bold">Admin Member</h1>
          <div className="row justify-content-center mb-5">
            <div className="col-lg-6 col-md-8">
              <form
                className="border p-4 rounded-4 shadow-sm"
                encType="multipart/form-data"
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control mb-3"
                />
                <label className="fw-bold mb-2">Category Type:</label>
                <select className="form-control mb-3">
                  <option value="">Select Category</option>
                  <option value="photo">Board-Member</option>
                  <option value="video">Team-Member</option>
                </select>
                <input
                  type="text"
                  placeholder="role"
                  className="form-control mb-3"
                />
                <label className="fw-bold">Upload Event Image</label>
                <input name="image" type="file" className="form-control mb-3" />
                <textarea placeholder="bio" className="form-control mb-3" />
                <button className="btn btn-primary w-100">Add Member</button>
              </form>
            </div>
          </div>
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
    </>
  );
}
