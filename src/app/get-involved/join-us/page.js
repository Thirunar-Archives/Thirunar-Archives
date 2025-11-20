"use client";
import ContactForm from "@/app/component/Contact-form";

export default function JoinUs() {
  return (
    <>
      <div className="bg-style">
        <section className="mt-5">
          <div className="row g-5 d-flex justify-content-center">
            <div className="col-sm-6 text-center">
              <h3 className="text-center">Contact us</h3>
              <p>You can reach us using this form:</p>
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}