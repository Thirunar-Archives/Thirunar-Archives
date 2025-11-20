"use client";
import VolunteerForm from "@/app/component/VolunteerForm";

export default function Volunteer() {
  return (
    <>
      {/* Volunteer Form */}
      <div className="bg-style">
        <section className="mt-5">
          <div className="row g-5 d-flex justify-content-center">
            <div className="col-sm-6 text-center">
              <h3>Become a volunteer</h3>
              <p>If you wish to volunteer with us, simply use this form:</p>
              <VolunteerForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}