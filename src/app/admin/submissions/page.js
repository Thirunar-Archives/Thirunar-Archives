"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function SubmissionsPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Limits table to exactly 10 lines at a time

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError("");
      
      const res = await fetch("/api/volunteer", {
        method: "GET",
        headers: { "Cache-Control": "no-cache" }
      });

      if (!res.ok) {
        throw new Error(`Server status code: ${res.status}`);
      }

      const data = await res.json();
      const arrayData = Array.isArray(data) ? data : (data.submissions || data.events || []);
      setSubmissions(arrayData);
      setCurrentPage(1); // Reset to page 1 whenever database updates/refreshes
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message || "Failed to fetch cloud records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const totalItems = submissions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedSubmissions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return submissions.slice(startIndex, endIndex);
  }, [submissions, currentPage]);

  // Labels text indicators (e.g., "1 - 10" or "11 - 20")
  const currentRangeStart = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const currentRangeEnd = Math.min(currentPage * itemsPerPage, totalItems);

  // Loading Screen Fallback
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger mb-3" role="status"></div>
        <div className="fs-5 fw-bold text-dark">Loading Cloud Data...</div>
      </div>
    );
  }

  // Error Banner Fallback
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger p-4 shadow-sm rounded-4" role="alert">
          <h5 className="fw-bold">Connection Issue</h5>
          <code className="d-block bg-white p-2 border rounded text-dark font-monospace mb-3">{error}</code>
          <button className="btn btn-sm btn-danger fw-bold" onClick={fetchSubmissions}>Retry </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold m-0">Volunteer Applications</h2>
          <p className="text-muted small m-0 mt-1">Showing entries {currentRangeStart}–{currentRangeEnd} of {totalItems} entries loaded.</p>
        </div>
        <button className="btn btn-danger btn-sm px-3 fw-bold rounded-pill" onClick={fetchSubmissions}>
          Refresh 
        </button>
      </div>

      <div className="table-responsive bg-white rounded-4 shadow-sm border table-scroll-container">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark text-uppercase tracking-wider small">
            <tr>
              <th className="py-3 ps-4">Name & Contact</th>
              <th className="py-3">Location</th>
              <th className="py-3">Availability & Hours</th>
              <th className="py-3">Interests</th>
              <th className="py-3 pe-4">Motivation Notes</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSubmissions.length > 0 ? (
              paginatedSubmissions.map((v) => (
                <tr key={v._id || Math.random()}>
                  <td className="py-3 ps-4">
                    <strong className="text-dark d-block">{v.name || v.content?.fullName || "Anonymous"}</strong>
                    <small className="text-muted font-monospace d-block">{v.email || v.content?.email || "No Email"}</small>
                    <small className="text-muted font-monospace d-block">{v.content?.phone || "No Phone"}</small>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark border px-2 py-1.5 rounded">
                      {v.content?.location || v.location || "Not Provided"}
                    </span>
                  </td>
                  <td>
                    {v.content?.availability && Array.isArray(v.content.availability) ? (
                      <div className="small text-dark mb-1">{v.content.availability.join(", ")}</div>
                    ) : (
                      <div className="small text-muted mb-1">Flexible</div>
                    )}
                    <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle">
                    </span>
                  </td>
                  <td>
                    {v.content?.interests && Array.isArray(v.content.interests) ? (
                      v.content.interests.map((item) => (
                        <span key={item} className="badge bg-info-subtle text-info border border-info-subtle me-1 my-1">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted small">None</span>
                    )}
                  </td>
                  <td className="py-3 pe-4">
                    <p className="small mb-0 text-muted bg-light p-2 rounded border" style={{ maxWidth: "300px", maxHeight: "80px", overflowY: "auto" }}>
                      {v.message || v.content?.bio || "No description statement attached."}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-muted">No Applications Found in Database.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalItems > itemsPerPage && (
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mt-4 p-3 bg-white rounded-4 border shadow-sm gap-3">
          <div className="small text-muted fw-semibold">
            Showing <span className="text-dark">{currentRangeStart}</span> to <span className="text-dark">{currentRangeEnd}</span> of <span className="text-dark">{totalItems}</span> applications
          </div>
          
          <nav aria-label="Table navigation controls page buttons">
            <ul className="pagination m-0 gap-1">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link rounded-3 border fw-bold text-dark px-3 py-2" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  « Prev
                </button>
              </li>

              {[...Array(totalPages)].map((_, pageIndex) => {
                const pageNumber = pageIndex + 1;
                return (
                  <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                    <button 
                      className={`page-link rounded-3 border px-3.5 py-2 fw-bold ${
                        currentPage === pageNumber 
                          ? 'bg-danger border-danger text-white' 
                          : 'bg-light text-muted hover-bg'
                      }`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                );
              })}

              {/* Next Nav Control Button */}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                  className="page-link rounded-3 border fw-bold text-dark px-3 py-2" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next »
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Custom Styles Injection */}
      <style jsx>{`
        :global(.table-scroll-container) {
          max-height: 680px; /* Forces explicit height containment profiles */
          overflow-y: auto;
          overflow-x: auto;
        }
        :global(.table-scroll-container::-webkit-scrollbar) {
          width: 6px;
          height: 6px;
        }
        :global(.table-scroll-container::-webkit-scrollbar-track) {
          background: #f1f1f1;
        }
        :global(.table-scroll-container::-webkit-scrollbar-thumb) {
          background: #dc3545; /* Brand Red accent coloring matching Thirunar */
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}