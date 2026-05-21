"use client";
import VolunteerForm from "../component/VolunteerForm";
import ContactForm from "../component/Contact-form";

export default function ContactUs() {
  return (
    <>
      <div className="bg-style">
        <h1 className="text-center">Contact-Us</h1>
        <div className="container py-5">
          <h3 className="text-center">Our Email:</h3>
          <p className="fs-5 text-center">project@thirunar.archives@gmail.com</p>
          <p className="fs-5 text-center">8/55 Bharathi Street<br/> Bharathi Nagar,<br/> Race Course
,<br/>Guindy,<br/>Chennai, Tamilnadu-600032</p>
          <div className="row g-5 mt-4">
            <div className="col-lg-7 ">
              <h3 className="text-center">Become a volunteer</h3>
              <p>If you wish to volunteer with us, simply use this form:</p>
              <VolunteerForm />
            </div>
            <div className="col-lg-5">
              <h3 className="text-center">Contact us</h3>
              <p>You can reach us using this form:</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}