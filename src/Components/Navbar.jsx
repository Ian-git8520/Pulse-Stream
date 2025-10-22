import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">Pulsestream</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Feed</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/report">Report</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
          </ul>
          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
            <Link to="/register" className="btn btn-light btn-sm">Sign Up</Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
