import React, { useEffect, useState } from "react";
import { USERS_URL, INCIDENTS_URL } from "../api";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [incidents, setIncidents] = useState([]);

  // 🔁 Load the active user whenever it changes in localStorage
  useEffect(() => {
    const loadUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("activeUser"));
      if (storedUser) {
        setUser(storedUser);
      } else {
        // fallback to last user in db.json
        fetch(USERS_URL)
          .then((res) => res.json())
          .then((data) => {
            if (data.length > 0) {
              const latest = data[data.length - 1];
              setUser(latest);
              localStorage.setItem("activeUser", JSON.stringify(latest));
            }
          })
          .catch(() => alert("⚠️ Could not load user profile."));
      }
    };

    loadUser();

    // Listen for login changes across tabs or app reloads
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  // 🧾 Load user's incidents
  useEffect(() => {
    if (!user) return;
    fetch(`${INCIDENTS_URL}?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => setIncidents(data))
      .catch(() => alert("⚠️ Error loading incidents."));
  }, [user]);

  // ❌ Delete an incident
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    fetch(`${INCIDENTS_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setIncidents((prev) => prev.filter((i) => i.id !== id));
      })
      .catch(() => alert("⚠️ Could not delete incident."));
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("activeUser");
    alert("You have been logged out.");
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ maxWidth: "800px" }}>
      <div className="card shadow p-4 mb-4">
        <div className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="rounded-circle mb-3"
            width="100"
            height="100"
          />
          <h4 className="fw-bold">{user.username}</h4>
          <p className="text-muted">{user.email}</p>
        </div>

        <hr />
        <p className="text-center mb-0 text-secondary">
          <strong>Member since:</strong> {new Date().toLocaleDateString()}
        </p>

        <div className="text-center mt-3">
          <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
            Logout
          </button>
        </div>
      </div>

      <h4 className="fw-bold mb-3 text-primary">🧾 My Reported Incidents</h4>

      {incidents.length === 0 ? (
        <p className="text-muted">You haven’t reported any incidents yet.</p>
      ) : (
        incidents.map((incident) => (
          <div key={incident.id} className="card shadow-sm mb-3">
            <div className="card-body">
              <h5 className="card-title text-primary">{incident.title}</h5>
              <p>{incident.description}</p>
              <p className="text-muted mb-1">
                <strong>📍 Location:</strong> {incident.location}
              </p>
              <p className="text-muted">
                <strong>📅 Date:</strong> {incident.datetime || "N/A"}
              </p>

              {incident.image && (
                <img
                  src={incident.image}
                  alt="attachment"
                  className="img-fluid rounded mt-2"
                />
              )}
              {incident.video && (
                <video
                  src={incident.video}
                  controls
                  className="w-100 mt-2 rounded"
                />
              )}
            </div>

            <div className="card-footer bg-transparent d-flex justify-content-end">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(incident.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
