import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          Pulsestream
        </NavLink>
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
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold text-light" : "")
                }
                to="/"
              >
                Feed
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold text-light" : "")
                }
                to="/report"
              >
                Report
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold text-light" : "")
                }
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold text-light" : "")
                }
                to="/about"
              >
                About
              </NavLink>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <NavLink to="/login" className="btn btn-outline-light btn-sm">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-light btn-sm">
              Sign Up
            </NavLink>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
