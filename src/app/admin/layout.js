"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
      setAuthorized(true);
      setIsChecking(false);
    } else if (userRole === "admin") {
      setAuthorized(true);
      setIsChecking(false);
    } else {
      setAuthorized(false);
      setIsChecking(false);
      router.replace("/admin/login");
    }
  }, [pathname, router]);

  if (isChecking) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-white">
        <div className="spinner-border text-danger" role="status"></div>
      </div>
    );
  }

  const isLoginPage = pathname === "/admin/login";
  const showNav = !isLoginPage && authorized;

  if (!authorized && !isLoginPage) return null;

  const navLinks = [
    { name: "Dashboard", path: "/admin" },
    { name: "Blogs", path: "/admin/blog" },
    { name: "Events", path: "/admin/event" },
    { name: "Media", path: "/admin/media" },
    { name: "Members", path: "/admin/member" },
    { name: "Storycards", path: "/admin/storycard" },
    { name: "Submissions", path: "/admin/submissions" }
  ];

  return (
    <div className="admin-wrapper bg-light min-vh-100">
      {showNav && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 py-2">
          <div className="container-fluid px-0">
            <Link href="/admin" className="navbar-brand fw-extrabold text-danger tracking-tight m-0">
              THIRUNAR ADMIN
            </Link>
            
            <button 
              className="navbar-toggler border-0 shadow-none" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#adminNavbarMenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="adminNavbarMenu">
              <ul className="navbar-nav mx-auto gap-1 my-2 my-lg-0">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <li className="nav-item" key={link.path}>
                      <Link 
                        href={link.path} 
                        className={`nav-link px-3 py-2 rounded-3 small fw-bold text-uppercase text-center tracking-wide transition-all ${
                          isActive ? "bg-danger text-white active" : "text-light opacity-75"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              
              <div className="d-flex justify-content-center">
                <button 
                  onClick={() => { localStorage.removeItem("userRole"); window.location.href="/admin/login"; }} 
                  className="btn btn-sm btn-outline-danger px-3 py-2 fw-bold text-uppercase tracking-wider rounded-3"
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className={showNav ? "container-fluid py-4 px-3 px-md-4 max-w-7xl" : ""}>
        {children}
      </main>

      <style jsx>{`
        :global(.fw-extrabold) {
          font-weight: 800 !important;
        }
        .max-w-7xl {
          max-width: 1400px;
          margin: 0 auto;
        }
        :global(.navbar-nav .nav-link) {
          font-size: 0.75rem !important;
          letter-spacing: 0.5px;
        }
        :global(.navbar-nav .nav-link:hover) {
          color: #ffffff !important;
          opacity: 1 !important;
          background-color: rgba(255, 255, 255, 0.05);
        }
        :global(.navbar-nav .nav-link.active:hover) {
          background-color: #dc3545 !important;
        }
      `}</style>
    </div>
  );
}