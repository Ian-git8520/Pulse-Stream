import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USERS_URL } from "../api";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = { username, email, password };

    fetch(USERS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(() => {
        alert("Account created successfully!");
        navigate("/");
      })
      .catch(() => alert("Server error. Please ensure JSON Server is running."));
  };

  return (
    <div className="container my-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">📝 Sign Up</h3>
      <form className="card p-4 shadow-sm" onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Create Account</button>
      </form>
    </div>
  );
}
