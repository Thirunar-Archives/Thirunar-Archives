"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Footer() {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-about">
          <Image
            href="/"
            src="/img/thirunar-white.png"
            alt="Thirunar Archives Logo"
            width={200}
            height={200}
            className="footer-logo"
          />
          <p className="pt-1 footer-para">
            Preserving the history, livelihood and empowerment of trans, queer
            and oppressed communities.
          </p>
        </div>
        {/* Center Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/about/who-we-are">About Us</a>
          <a href="/events">Events</a>
          <a href="/donate">Donate</a>
          <a href="/our-work/what-we-do">What We Do</a>
          <a href="/contact-us">Contact</a>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/about/board-and-advisors">Board and Advisors</a>
          <a href="/about/team">Team</a>
          <a href="/about/history">History</a>
          <a href="/get-involved/submissions">Submission</a>
          <a href="/get-involved/volunteer">Volunteer</a>
        </div>
        {/* Contact */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: contact@thirunararchives.org</p>
          <p>Phone: +91 98765 43210</p>
          <div className="footer-social">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="footer-bottom container py-3">
        <div className="row w-100 text-center text-md-start align-items-center">
          {/* Center Text */}
          <div className="col-md-8 mb-2 mb-md-0 text-md-end">
            © {new Date().getFullYear()} Thirunar Archives — All Rights Reserved
          </div>
          {/* Right Text */}
          {/* <div className="col-md-4 text-md-end">
            Designed by <strong>Cloudlabel</strong>
          </div> */}
        </div>
      </div>
      {/* Back to Top Button */}
      {showButton && (
        <button className="back-to-top" onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </footer>
  );
}
