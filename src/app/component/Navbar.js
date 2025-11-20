"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const pathname = usePathname();
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
      {/* Top Bar with Logo and Donate Button */}
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
            <div className="top-bar-right">
              <a href="/donate" className="donate-btn">
                DONATE
              </a>
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
      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
      {/* Sidebar Menu */}
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
            {/* ABOUT US DROPDOWN */}
            <div className="dropdown">
              <Link
                className={`sidebar-link dropdown-toggle ${
                  isActive("/about") ? "active" : ""
                }`}
                data-bs-toggle="dropdown"
                href="#"
              >
                About Us
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className={`dropdown-item ${
                      isActive("/about/who-we-are") ? "active" : ""
                    }`}
                    href="/about/who-we-are"
                    onClick={toggleSidebar}
                  >
                    Who We Are
                  </Link>
                </li>
                <li>
                  {/* <Link
                    className={`dropdown-item ${
                      isActive("/about/annual-reports") ? "active" : ""
                    }`}
                    href="/about/annual-reports"
                    onClick={toggleSidebar}
                  >
                    Annual Report
                  </Link> */}
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${
                      isActive("/about/awards") ? "active" : ""
                    }`}
                    href="/about/awards"
                    onClick={toggleSidebar}
                  >
                    Awards
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${
                      isActive("/about/blog") ? "active" : ""
                    }`}
                    href="/about/blog"
                    onClick={toggleSidebar}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${
                      isActive("/about/board-and-advisors") ? "active" : ""
                    }`}
                    href="/about/board-and-advisors"
                    onClick={toggleSidebar}
                  >
                    Board and Advisors
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${
                      isActive("/about/history") ? "active" : ""
                    }`}
                    href="/about/history"
                    onClick={toggleSidebar}
                  >
                    History
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${
                      isActive("/about/team") ? "active" : ""
                    }`}
                    href="/about/team"
                    onClick={toggleSidebar}
                  >
                    Team
                  </Link>
                </li>
              </ul>
            </div>
            {/* OUR WORK DROPDOWN */}
            <div className="dropdown">
              <Link
                className={`sidebar-link dropdown-toggle ${
                  isActive("/our-work") ? "active" : ""
                }`}
                data-bs-toggle="dropdown"
                href="#"
              >
                Our Work
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    href="/our-work/story-cards"
                    className={`dropdown-item ${
                      isActive("/our-work/story-cards") ? "active" : ""
                    }`}
                    onClick={toggleSidebar}
                  >
                    Story Cards
                  </Link>
                </li>
                <li>
                  <Link
                    href="/our-work/what-we-do"
                    className={`dropdown-item ${
                      isActive("/our-work/what-we-do") ? "active" : ""
                    }`}
                    onClick={toggleSidebar}
                  >
                    What We Do
                  </Link>
                </li>
              </ul>
            </div>
            {/* GET INVOLVED DROPDOWN */}
            <div className="dropdown">
              <Link
                className={`sidebar-link dropdown-toggle ${
                  isActive("/get-involved") ? "active" : ""
                }`}
                data-bs-toggle="dropdown"
                href="#"
              >
                Get Involved
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    href="/get-involved/volunteer"
                    className={`dropdown-item ${
                      isActive("/get-involved/volunteer") ? "active" : ""
                    }`}
                    onClick={toggleSidebar}
                  >
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/get-involved/submissions"
                    className={`dropdown-item ${
                      isActive("/get-involved/submissions") ? "active" : ""
                    }`}
                    onClick={toggleSidebar}
                  >
                    Submission
                  </Link>
                </li>
                <li>
                  <Link
                    href="/get-involved/join-us"
                    className={`dropdown-item ${
                      isActive("/get-involved/join-us") ? "active" : ""
                    }`}
                    onClick={toggleSidebar}
                  >
                    Join With Us
                  </Link>
                </li>
              </ul>
            </div>
            {/* SIMPLE LINKS */}
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
              className={`sidebar-link ${
                isActive("/contact-us") ? "active" : ""
              }`}
              onClick={toggleSidebar}
            >
              Contact Us
            </Link>
          </nav>
          <div className="sidebar-footer">
            <div className="sidebar-footer-links">
              <a href="/donate">DONATE</a>
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
    </>
  );
}