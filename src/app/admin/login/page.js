"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username.trim() === "admin" && password === "admin123") { 
      setError("");
      
      localStorage.setItem("userRole", "admin"); 
      document.cookie = "userRole=admin; path=/; max-age=86400; SameSite=Strict";
      
      window.location.href = "/admin"; 
    } else {
      setError("Invalid username or password. Access Denied.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4 p-md-5 shadow-lg border-0" style={{ width: "400px", borderRadius: "16px" }}>
        <div className="text-center mb-4">
          <h4 className="fw-bold text-danger m-0 tracking-tight">THIRUNAR ARCHIVES</h4>
          <small className="text-muted text-uppercase tracking-wider col-12 d-block mt-1">
            Administrative Portal
          </small>
        </div>
        
        {error && (
          <div className="alert alert-danger py-2 small text-center fw-semibold" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted text-uppercase">Username</label>
            <input 
              type="text" 
              placeholder="Enter username" 
              className="form-control bg-light py-2 px-3 text-dark fw-bold"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold text-muted text-uppercase">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="form-control bg-light py-2 px-3 text-dark fw-bold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-danger w-100 py-2.5 fw-bold shadow-sm text-uppercase tracking-wide">
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}