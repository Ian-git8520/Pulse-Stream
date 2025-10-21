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
        const user = users.find(u => u.password === formData.password);
        if (user) {
          onLogin(user);
        } else {
          setError("Invalid email or password.");
        }
      })
      .catch(() => setError("Server error. Please try again later."));
  }

  return (
    <div className="auth-bg">
    <div className="container mt-0 vh-100 d-flex align-items-center justify-content-center flex-column">
      <h2 className=" text-white font-weight-bold  mt-5 ">LOGIN</h2>
      <form onSubmit={handleSubmit} className="card p-5 shadow w-100 " style={{ maxWidth: "400px" }}>
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
        <p className="mt-3 text-center">
          Don't have an account? <a href="/Signup">Sign up</a>
        </p>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
