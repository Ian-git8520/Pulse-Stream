import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USERS_URL } from "../api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch(USERS_URL)
      .then((res) => res.json())
      .then((users) => {
        const user = users.find(
          (u) =>
            (u.email === email || u.username === email) &&
            u.password === password
        );

        if (user) {
          
          localStorage.setItem("activeUser", JSON.stringify(user));

          alert(`Welcome back, ${user.username || user.email}!`);
          navigate("/profile");
        } else {
          alert("Invalid credentials! Try again or sign up.");
        }
      })
      .catch(() => alert("Server error. Please ensure JSON Server is running."));
  };

  return (
    <div className="container my-5 auth-bg" style={{ maxWidth: "400px" }}>
      <h1 className="text-center mb-4">PulseStream</h1>
      <h3 className="text-center mb-4">Login</h3>
      <form className="card p-4 shadow-sm" onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email or Username</label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email or username"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        <p className="text-center mt-3">
          Don’t have an account? <a href="/Register">Sign up</a>
        </p>
      </form>
    </div>
  );
}
