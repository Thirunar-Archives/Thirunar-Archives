"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => pathname.startsWith(path);

  useEffect(() => {
    const handleScroll = () => {
      const topBar = document.querySelector(".top-bar");
      if (window.scrollY > 50) {
        topBar.classList.add("scrolled");
      } else {
        topBar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      const topBar = document.querySelector(".top-bar");
      if (window.scrollY > 50) {
        topBar.classList.add("scrolled");
      } else {
        topBar.classList.remove("scrolled");
      }
      if (isOpen) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setIsOpen(false);
        }, 0.3); 
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [isOpen]);

  return (
    <>
      <div className="top-bar">
        <div className="container-fluid">
          <div className="top-bar-content">
            <div className="logo">
              <Image
                href="/"
                src="/img/thirunar-black.png"
                alt="Thirunar Archives Logo"
                width={50}
                height={50}
                className="header-logo"
              />
            </div>
            <div className="top-bar-right d-flex align-items-center gap-2">
              <a href="/Donate" className="donate-btn m-0">
                DONATE
              </a>
              <Link href="/admin/login" className="admin-nav-btn d-none d-md-inline-block text-decoration-none">
                ADMIN ACCESS
              </Link>
              <button
                className={`hamburger ${isOpen ? "active" : ""}`}
                onClick={toggleSidebar}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>

      <div className={`sidebar-menu angle-right ${isOpen ? "active" : ""}`}>
        <button
          className="close-btn"
          onClick={toggleSidebar}
          aria-label="Close menu"
        >
          ✕
        </button>
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <Link
              href="/"
              className={`sidebar-link ${isActive("/") ? "active" : ""}`}
              onClick={toggleSidebar}
            >
              Home
            </Link>

            <div className="dropdown">
              <Link
                className={`sidebar-link dropdown-toggle ${isActive("/about") ? "active" : ""}`}
                data-bs-toggle="dropdown"
                href="#"
              >
                About Us
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className={`dropdown-item ${isActive("/about/who-we-are") ? "active" : ""}`}
                    href="/about/who-we-are"
                    onClick={toggleSidebar}
                  >
                    Who We Are
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${isActive("/about/history") ? "active" : ""}`}
                    href="/about/history"
                    onClick={toggleSidebar}
                  >
                    History
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${isActive("/about/board-and-advisors") ? "active" : ""}`}
                    href="/about/board-and-advisors"
                    onClick={toggleSidebar}
                  >
                    Board of Trustees
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${isActive("/about/blog") ? "active" : ""}`}
                    href="/about/blog"
                    onClick={toggleSidebar}
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="dropdown">
              <Link
                className={`sidebar-link dropdown-toggle ${isActive("/our-work") ? "active" : ""}`}
                data-bs-toggle="dropdown"
                href="#"
              >
                Our Work
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    href="/our-work/what-we-do"
                    className={`dropdown-item ${isActive("/our-work/what-we-do") ? "active" : ""}`}
                    onClick={toggleSidebar}
                  >
                    What We Do
                  </Link>
                </li>
              </ul>
            </div>

            <div className="dropdown">
              <Link
                className={`sidebar-link dropdown-toggle ${isActive("/get-involved") ? "active" : ""}`}
                data-bs-toggle="dropdown"
                href="#"
              >
                Get Involved
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    href="/get-involved/volunteer"
                    className={`dropdown-item ${isActive("/get-involved/volunteer") ? "active" : ""}`}
                    onClick={toggleSidebar}
                  >
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/get-involved/submissions"
                    className={`dropdown-item ${isActive("/get-involved/submissions") ? "active" : ""}`}
                    onClick={toggleSidebar}
                  >
                    Submission
                  </Link>
                </li>
                <li>
                  <Link
                    href="/get-involved/join-us"
                    className={`dropdown-item ${isActive("/get-involved/join-us") ? "active" : ""}`}
                    onClick={toggleSidebar}
                  >
                    Join With Us
                  </Link>
                </li>
              </ul>
            </div>
            
            <Link
              href="/events"
              className={`sidebar-link ${isActive("/events") ? "active" : ""}`}
              onClick={toggleSidebar}
            >
              Events
            </Link>
            <Link
              href="/media"
              className={`sidebar-link ${isActive("/media") ? "active" : ""}`}
              onClick={toggleSidebar}
            >
              Media
            </Link>
            <Link
              href="/contact-us"
              className={`sidebar-link ${isActive("/contact-us") ? "active" : ""}`}
              onClick={toggleSidebar}
            >
              Contact Us
            </Link>
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-footer-links d-flex flex-column gap-2 align-items-center w-100 px-3 mb-3">
              <a href="/Donate" className="w-100 text-center py-2 rounded-3 bg-white text-danger fw-extrabold tracking-wider" style={{ fontSize: "0.85rem" }}>
                DONATE
              </a>
              <Link href="/admin/login" onClick={toggleSidebar} className="w-100 text-center py-2 rounded-3 border border-light text-white fw-bold tracking-wide text-uppercase text-decoration-none" style={{ fontSize: "0.75rem", opacity: 0.85 }}>
                ADMIN LOGIN
              </Link>
            </div>
            <div className="sidebar-social">
              <a href="#facebook" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#instagram" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#twitter" aria-label="Twitter">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#youtube" aria-label="youtube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.admin-nav-btn) {
          color: #ffffff !important;
          background-color: transparent !important;
          border: 1.5px solid rgba(255, 255, 255, 0.4) !important;
          font-size: 0.72rem !important;
          font-weight: 700 !important;
          letter-spacing: 1px !important;
          padding: 8px 16px !important;
          border-radius: 6px !important;
          transition: all 0.2s ease-in-out !important;
        }
        :global(.admin-nav-btn:hover) {
          border-color: #dc3545 !important;
          background-color: #dc3545 !important;
          color: #ffffff !important;
        }
      `}</style>
    </>
  );
}
