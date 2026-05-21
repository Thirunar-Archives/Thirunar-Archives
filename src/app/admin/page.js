"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    blogs: 0,
    events: 0,
    media: 0,
    submissions: 0
  });
  const [timeStr, setTimeStr] = useState("12:00:00 AM");
  const [dateStr, setDateStr] = useState("Friday, May 22, 2026");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }));
    }, 1000);

    setStats({
      blogs: 14,
      events: 5,
      media: 42,
      submissions: 3
    });

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container-fluid py-4 bg-light-custom min-vh-100">
      
      <div className="card shadow-sm border-0 rounded-4 p-4 bg-white mb-4 main-hero-shadow">
        <div className="row align-items-center g-3">
          <div className="col-md-7">
            <h2 className="fw-black text-dark m-0">Hi, Thirunar Archive Admin! 👋</h2>
            <p className="text-dark fw-semibold small m-0 mt-2 opacity-75">Welcome back to your central command center. Everything you need to manage your archive platform is structured right at your fingertips.</p>
          </div>
          <div className="col-md-5 text-md-end text-start border-start-md">
            <div className="p-3 bg-white rounded-4 border text-center d-inline-block w-100 style-clock-box">
              <h2 className="fw-black text-danger m-0 tracking-tight font-monospace">{timeStr}</h2>
              <span className="text-dark fw-bold small opacity-50 d-block mt-1">{dateStr}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {[
          { title: "Blogs Published", count: stats.blogs, icon: "📝", color: "primary", path: "/admin/blog" },
          { title: "Active Events", count: stats.events, icon: "📅", color: "danger", path: "/admin/event" },
          { title: "Archived Media", count: stats.media, icon: "🖼️", color: "success", path: "/admin/media" },
          { title: "Form Submissions", count: stats.submissions, icon: "📥", color: "warning", path: "/admin/submissions" }
        ].map((item) => (
          <div className="col-sm-6 col-xl-3" key={item.title}>
            <div className={`card h-100 border-0 rounded-4 p-3 bg-white shadow-sm border-start border-${item.color} border-5 transition-card`}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-dark fw-extrabold small text-uppercase tracking-wider opacity-50 d-block mb-1">{item.title}</span>
                  <h2 className="fw-black text-dark m-0">{item.count}</h2>
                </div>
                <span className="fs-1 p-2 bg-light rounded-3 shadow-inner-mini">{item.icon}</span>
              </div>
              <Link href={item.path} className={`text-${item.color} text-decoration-none small fw-black d-block mt-3 tracking-wide text-uppercase btn-lg-text`}>
                Manage Dashboard →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 rounded-4 p-4 bg-white h-100">
            <div className="mb-4 border-bottom pb-3">
              <h4 className="fw-black text-danger m-0"> Quick System Actions</h4>
              <p className="text-dark fw-bold small opacity-50 m-0 mt-1">Direct shortcut pathways to common pipeline routines.</p>
            </div>
            
            <div className="d-flex flex-column gap-3">
              <Link href="/admin/blog" className="btn btn-light border p-3 rounded-4 text-start d-flex align-items-center justify-content-between hover-action-row text-decoration-none transition-all">
                <div className="d-flex align-items-center gap-3">
                  <span className="fs-3"></span>
                  <div>
                    <strong className="text-dark d-block">Compose New Blog Article</strong>
                    <span className="text-muted small">Open clean canvas editor space</span>
                  </div>
                </div>
                <span className="text-danger fw-black">Go →</span>
              </Link>

              <Link href="/admin/event" className="btn btn-light border p-3 rounded-4 text-start d-flex align-items-center justify-content-between hover-action-row text-decoration-none transition-all">
                <div className="d-flex align-items-center gap-3">
                  <span className="fs-3"></span>
                  <div>
                    <strong className="text-dark d-block">Schedule Timeline Event</strong>
                    <span className="text-muted small">Map records onto seasonal modules</span>
                  </div>
                </div>
                <span className="text-danger fw-black">Go →</span>
              </Link>

              <div className="btn btn-light border p-3 rounded-4 text-start d-flex align-items-center justify-content-between hover-action-row transition-all" onClick={() => alert("Cloud cache memory purged successfully! ✨")} style={{ cursor: "pointer" }}>
                <div className="d-flex align-items-center gap-3">
                  <span className="fs-3"></span>
                  <div>
                    <strong className="text-dark d-block">Clear Cloud Platforms Cache</strong>
                    <span className="text-muted small">Force re-evaluation of data nodes</span>
                  </div>
                </div>
                <span className="text-secondary fw-bold small text-uppercase">Execute</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card shadow-sm border-0 rounded-4 p-4 bg-white h-100">
            <div className="mb-4 border-bottom pb-3">
              <h4 className="fw-black text-dark m-0"> Administrative Audit Log</h4>
              <p className="text-dark fw-bold small opacity-50 m-0 mt-1">Reviewing transaction events initialized across databases.</p>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 border-0">
                <thead>
                  <tr className="text-uppercase small text-muted font-monospace border-bottom">
                    <th className="pb-2 border-0">Operation Handle</th>
                    <th className="pb-2 border-0">Module Vector</th>
                    <th className="pb-2 border-0 text-end">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-bottom-subtle">
                    <td className="py-3 border-0"><span className="fw-bold text-dark">GET Cluster Sync</span></td>
                    <td className="py-3 border-0"><span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">Events</span></td>
                    <td className="py-3 border-0 text-end text-secondary small font-monospace">Just Now</td>
                  </tr>
                  <tr className="border-bottom-subtle">
                    <td className="py-3 border-0"><span className="fw-bold text-dark">POST Published Card</span></td>
                    <td className="py-3 border-0"><span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">Blogs</span></td>
                    <td className="py-3 border-0 text-end text-secondary small font-monospace">12 mins ago</td>
                  </tr>
                  <tr className="border-bottom-subtle">
                    <td className="py-3 border-0"><span className="fw-bold text-dark">DELETE File Eviction</span></td>
                    <td className="py-3 border-0"><span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">Media Assets</span></td>
                    <td className="py-3 border-0 text-end text-secondary small font-monospace">1 hr ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        :global(.fw-black) { font-weight: 900 !important; }
        :global(.fw-extrabold) { font-weight: 800 !important; }
        
        .bg-light-custom { background-color: #f8fafc; }
        .main-hero-shadow { box-shadow: 0 4px 25px rgba(0,0,0,0.03) !important; }
        .shadow-inner-mini { background-color: #f1f5f9; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); }
        .border-bottom-subtle { border-bottom: 1px solid #f1f5f9; }
        .btn-lg-text { font-size: 0.8rem; letter-spacing: 0.5px; }

        .style-clock-box {
          background: #ffffff !important;
          border: 2px solid #edf2f7 !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02) !important;
        }

        .hover-action-row:hover {
          background-color: #fff5f5 !important;
          border-color: #f87171 !important;
          transform: translateX(3px);
        }

        @media (min-width: 768px) {
          .border-start-md {
            border-start: 2px solid #edf2f7 !important;
            padding-left: 2rem !important;
          }
        }

        :global(.transition-card) { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        :global(.transition-card:hover) {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.06) !important;
        }
      `}</style>
    </div>
  );
}