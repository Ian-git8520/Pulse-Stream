import React from "react";

export default function IncidentCard({ incident }) {
  return (
    <div className="card mb-3 shadow-sm"> 
      <div className="card-body">
        <h5 className="card-title">{incident.type}</h5>
        <p>{incident.description}</p>
        <small className="text-muted">
          {incident.location} — {incident.datetime}
        </small>
      </div>
    </div>
  );
}
