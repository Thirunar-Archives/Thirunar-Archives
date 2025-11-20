"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HeroHeader() {
  const pathname = usePathname(); 
  const [currentSlide, setCurrentSlide] = useState(0);

  // HOMEPAGE SLIDER IMAGES

  const slides = [
    {
      title: "CATALYZING AN EQUAL WORLD",
      subtitle: "SCROLL TO EXPLORE",
      image: "/img/hero-1.png",
      bgPosition: "left",
    },
    {
      title: "EMPOWERING COMMUNITIES",
      subtitle: "SCROLL TO EXPLORE",
      image: "/img/hero-2.png",
      bgPosition: "center",
    },
    {
      title: "BUILDING FUTURES",
      subtitle: "SCROLL TO EXPLORE",
      image: "/img/hero-1.png",
      bgPosition: "right",
    },
    {
      title: "BUILDING FUTURES",
      subtitle: "SCROLL TO EXPLORE",
      image: "/img/hero-1.png",
      bgPosition: "center",
    },
    {
      title: "BUILDING FUTURES",
      subtitle: "SCROLL TO EXPLORE",
      image: "/img/hero-1.png",
      bgPosition: "left",
    },
  ];
  // PAGE-SPECIFIC HERO CONFIG
  const pageHero = {
    "/donate": {
      image: "/img/hero-1.png",
      title: "Donate",
    },
    "/about/blog": {
      image: "/img/hero-2.png",
      title: "Blogs",
    },
    "/about/who-we-are": {
      image: "/img/hero-1.png",
      title: "Who We Are",
    },
    "/about/team": {
      image: "/img/hero-1.png",
      title: "Our Team",
    },
    "/about/annual-reports": {
      image: "/img/hero-1.png",
      title: "Annual Report",
    },
     "/about/awards": {
      image: "/img/hero-1.png",
      title: "Awards",
    },
     "/about/board-and-advisors": {
      image: "/img/hero-1.png",
      title: "Board & Advisors",
    },
     "/about/history": {
      image: "/img/hero-1.png",
      title: "History",
    },
    "/our-work/story-cards": {
      image: "/img/hero-1.png",
      title: "Story Cards",
    },
    "/our-work/what-we-do": {
      image: "/img/hero-1.png",
      title: "What We Do",
    },
    "/get-involved": {
      image: "/img/hero-1.png",
      title: "Get Involved",
    },
    "/get-involved/volunteer": {
      image: "/img/hero-1.png",
      title: "Volunteer",
    },
    "/get-involved/submissions": {
      image: "/img/hero-1.png",
      title: "Submission",
    },
    "/get-involved/join-us": {
      image: "/img/hero-1.png",
      title: "Join With Us",
    },
    "/media": {
      image: "/img/hero-1.png",
      title: "Media",
    },
    "/events": {
      image: "/img/hero-1.png",
      title: "Events",
    },
    "/contact-us": {
      image: "/img/hero-1.png",
      title: "Contact Us",
    },
  };
  // Matching dynamic pages like /about/history/2024
  const currentPageHero =
    pageHero[pathname] ||
    pageHero[pathname.split("/").slice(0, 2).join("/")] ||
    pageHero["/about"]; // fallback hero
  // HOMEPAGE SLIDER AUTO CHANGE
  useEffect(() => {
    if (pathname !== "/") return; 
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [pathname, slides.length]);
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  // NON-HOMEPAGE: STATIC HERO HEADER
  if (pathname !== "/") {
    return (
      <section className="hero-section small-hero">
        <div
          className="hero-slide active"
          style={{
            backgroundImage: `url(${currentPageHero.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="container-fluid">
            <div className="row align-items-center hero-row">
              <div className="col-lg-6 hero-left">
                <div className="hero-text-panel">
                  <div className="hero-text-content">
                    <h1 className="hero-title">{currentPageHero.title}</h1>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 hero-right"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
// HOMEPAGE: SLIDER SECTION
  return (
    <section className="hero-section">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundPosition: slide.bgPosition,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="hero-overlay"></div>
        </div>
      ))}
      <div className="hero-content">
        <div className="container-fluid">
          <div className="row align-items-center hero-row">
            <div className="col-lg-6 hero-left">
              <div className="hero-text-panel">
                <div className="hero-text-content">
                  <h1 className="hero-title">
                    {slides[currentSlide].title}
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-lg-6 hero-right"></div>
          </div>
        </div>
        {/* Slider Dots */}
        <div className="hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}