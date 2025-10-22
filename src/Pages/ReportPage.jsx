import React, { useState } from "react";
import { INCIDENTS_URL } from "../api";

export default function ReportPage() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");

  const handleFileUpload = (e, setFunc) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFunc(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIncident = {
      user_id: 1,
      type: type || "Untitled Incident",
      location: location || "Unknown location",
      description: description || "No description provided.",
      datetime: new Date().toISOString(),
      status: "Open",
      comments: [],
      likes: 0,
      attachments: [
        ...(image ? [image] : []),
        ...(video ? [video] : []),
      ],
    };

    fetch(INCIDENTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIncident),
    })
      .then((res) => res.json())
      .then(() => {
        alert("✅ Incident reported successfully!");
        setType("");
        setDescription("");
        setLocation("");
        setImage("");
        setVideo("");
      })
      .catch(() => alert("⚠️ Error: Please ensure your JSON server is running."));
  };

  return (
    <div className="container my-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow-sm p-4">
        <h3 className="mb-3 text-center">Report an Incident</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Incident Type</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Fire outbreak near CBD"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Describe what happened..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter city or coordinates"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Attach Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => handleFileUpload(e, setImage)}
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="img-fluid mt-2 rounded shadow-sm"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              />
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Attach Video</label>
            <input
              type="file"
              accept="video/*"
              className="form-control"
              onChange={(e) => handleFileUpload(e, setVideo)}
            />
            {video && (
              <video
                controls
                src={video}
                className="w-100 mt-2 rounded shadow-sm"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              ></video>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
