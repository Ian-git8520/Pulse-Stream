import React, { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users?email=${formData.email}`)
      .then((res) => res.json())
      .then((users) => {
        if (users.length > 0 && users[0].password === formData.password) {
          onLogin(users[0]);
          setError("");
        } else {
          setError("Invalid email or password.");
        }
      })
      .catch(() => setError("Server error. Please try again later."));
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Login</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <input
          className="form-control mb-2"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="form-control mb-3"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button className="btn btn-success">Login</button>
        {error && <p className="text-danger mt-3 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
