import React, { useState } from "react";

const ReportPage = () => {
  const [form, setForm] = useState({ title: "", description: "", media: "" });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/incidents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to post");
        return res.json();
      })
      .then(() => {
        setMessage("✅ Incident successfully reported!");
        setForm({ title: "", description: "", media: "" });
      })
      .catch(() => setMessage("❌ Error while reporting."));
  }

  return (
    <div className="container mt-5">
      <h2>Report an Incident</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow mt-3">
        <input
          className="form-control mb-2"
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Incident Title"
          required
        />
        <textarea
          className="form-control mb-2"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe what happened"
          required
        />
        <input
          className="form-control mb-3"
          type="url"
          name="media"
          value={form.media}
          onChange={handleChange}
          placeholder="Image/Video URL"
        />
        <button className="btn btn-danger">Submit Report</button>
        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default ReportPage;
