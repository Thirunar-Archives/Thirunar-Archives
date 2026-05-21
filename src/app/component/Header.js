"use client";
import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function HeroHeader() {
  const pathname = usePathname();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(() => [
    {
      title: "CATALYZING AN EQUAL WORLD",
      subtitle: "SCROLL TO EXPLORE",
      image: "/img/i1.jpg",
      bgPosition: "left",
    },
    {
      title: "EMPOWERING COMMUNITIES",
      subtitle: "SCROLL TO EXPLORE",
      image: "/img/h1.jpg",
      bgPosition: "center",
    },
    {
      title: "BUILDING FUTURES",
      subtitle: "SCROLL TO EXPLORE",
      image: "/img/i3.jpg",
      bgPosition: "right",
    },
    {
      title: "BUILDING FUTURES",
      subtitle: "SCROLL TO EXPLORE",
      image: "/img/RAK09318-.jpg",
      bgPosition: "center",
    },
    {
      title: "BUILDING FUTURES",
      subtitle: "SCROLL TO EXPLORE",
      image: "/img/P1025455-jpg.jpg",
      bgPosition: "left",
    },
  ], []);

  const pageHero = useMemo(() => ({
    "/donate": { image: "/img/i1.jpg", title: "Donate" },
    "/about/blog": { image: "/img/i3.jpg", title: "Blogs" },
    "/about/who-we-are": { image: "/img/i1.jpg", title: "Who We Are" },
    "/about/team": { image: "/img/i3.png", title: "Our Team" },
    "/about/annual-reports": { image: "/img/Kiran_Training.jpg", title: "Annual Report" },
    "/about/awards": { image: "/img/i1.jpg", title: "Awards" },
    "/about/board-and-advisors": { image: "/img/i1.jpg", title: "Board & Advisors" },
    "/about/history": { image: "/img/imresizer-DCS00581.jpg", title: "History" },
    "/our-work/story-cards": { image: "/img/imresizer-DC00581.jpg", title: "Story Cards" },
    "/our-work/what-we-do": { image: "/img/cir.jpg", title: "What We Do" },
    "/get-involved": { image: "/img/i1.jpg", title: "Get Involved" },
    "/get-involved/volunteer": { image: "/img/i1.jpg", title: "Volunteer" },
    "/get-involved/submissions": { image: "/img/i3.jpg", title: "Submission" },
    "/get-involved/join-us": { image: "/img/h1.jpg", title: "Join With Us" },
    "/media": { image: "/img/i1.jpg", title: "Media" },
    "/events": { image: "/img/RAK09318-.jpg", title: "Events" },
    "/contact-us": { image: "/img/i1.jpg", title: "Contact Us" },
  }), []);

  const currentPageHero = useMemo(() => {
    return pageHero[pathname] ||
      pageHero[pathname.split("/").slice(0, 2).join("/")] || {
        image: "/img/i3.jpg",
        title: "Thirunar Archives",
      };
  }, [pathname, pageHero]);

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

  if (pathname !== "/") {
    return (
      <section className="hero-section small-hero position-relative overflow-hidden">
        {/* Underlay Image Wrapper */}
        <div className="hero-slide active position-absolute top-0 start-0 w-100 h-100">
          <Image
            src={currentPageHero.image}
            alt={currentPageHero.title}
            fill
            sizes="100vw"
            quality={75} // Automatically compresses heavy inputs down to 75% file size
            priority     // Preloads immediately on route change to prevent layout shift
            className="object-fit-cover"
            style={{ objectPosition: "center" }}
          />
          <div className="hero-overlay" style={{ zIndex: 1, position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}></div>
        </div>

  
        <div className="hero-content position-relative" style={{ zIndex: 2 }}>
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

  return (
    <section className="hero-section position-relative overflow-hidden" style={{ minHeight: "100vh" }}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide position-absolute top-0 start-0 w-100 h-100 ${index === currentSlide ? "active" : ""}`}
          style={{ 
            opacity: index === currentSlide ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
            zIndex: index === currentSlide ? 1 : 0
          }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="100vw"
            quality={75} // Dynamic WebP delivery handles optimization automations
            priority={index === 0} // Highest initialization payload priority targeting the first viewport frame
            className="object-fit-cover"
            style={{ objectPosition: slide.bgPosition }}
          />
          <div className="hero-overlay" style={{ zIndex: 2, position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}></div>
        </div>
      ))}
      
      <div className="hero-content position-relative" style={{ zIndex: 3 }}>
        <div className="container-fluid">
          <div className="row align-items-center hero-row">
            <div className="col-lg-6 hero-left">
              <div className="hero-text-panel">
                <div className="hero-text-content">
                  <h1 className="hero-title">{slides[currentSlide].title}</h1>
                </div>
              </div>
            </div>
            <div className="col-lg-6 hero-right"></div>
          </div>
        </div>
        
        <div className="hero-dots" style={{ zIndex: 4 }}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}