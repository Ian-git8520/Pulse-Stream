import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";

const IncidentDetail = () => {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3080/incidents/${id}`)
      .then((res) => res.json())
      .then(setIncident)
      .catch(console.error);

    
    const checkDark = () =>
      setIsDarkMode(
        document.body.classList.contains("bg-dark") ||
          window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [id]);

  const handleLike = () => {
    if (!incident) return;
    const updatedLikes = (incident.likes || 0) + 1;

    fetch(`http://localhost:3080/incidents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((res) => res.json())
      .then(setIncident)
      .catch(console.error);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComments = [...(incident.comments || []), commentText];

    fetch(`http://localhost:3080/incidents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comments: newComments }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setIncident(updated);
        setCommentText("");
      })
      .catch(console.error);
  };

  if (!incident) {
    return (
      <div className="text-center mt-5">
        <h3>Loading incident details...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link to="/feed" className="btn btn-outline-secondary mb-4">
        ⬅ Back to Feed
      </Link>

      <Card
        className={`shadow-lg border-0 rounded-4 overflow-hidden ${
          isDarkMode ? "bg-dark text-light" : ""
        }`}
      >
        {incident.attachments && incident.attachments.length > 0 ? (
          incident.attachments[0].endsWith(".mp4") ? (
            <video
              src={incident.attachments[0]}
              controls
              className="w-100"
              style={{ height: "450px", objectFit: "cover" }}
            />
          ) : (
            <Card.Img
              variant="top"
              src={incident.attachments[0]}
              alt={incident.type}
              style={{ height: "450px", objectFit: "cover" }}
            />
          )
        ) : (
          <div
            className="bg-secondary text-white d-flex align-items-center justify-content-center"
            style={{ height: "450px", fontSize: "1.2rem", fontWeight: "500" }}
          >
            No Image or Video Available
          </div>
        )}

        <Card.Body className="p-4">
          <Card.Title className="fw-bold text-primary fs-3 mb-3">
            {incident.type}
          </Card.Title>
          <Card.Subtitle className="text-muted mb-3">
            📍 {incident.location}
          </Card.Subtitle>
          <Card.Text className="lead">{incident.description}</Card.Text>

          <p className="text-muted mb-1">
            <strong>Date:</strong>{" "}
            {new Date(incident.datetime).toLocaleString()}
          </p>
          <p className="text-muted">
            <strong>Status:</strong> {incident.status || "Ongoing"}
          </p>

          <div className="d-flex justify-content-start align-items-center gap-3 mt-3">
            <Button variant="outline-primary" size="sm" onClick={handleLike}>
              👍 {incident.likes || 0}
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Relevant media */}
      {incident.attachments && incident.attachments.length > 1 && (
        <div className="mt-5">
          <h4 className="fw-bold mb-3 text-primary">Additional Media</h4>
          <div className="row">
            {incident.attachments.slice(1).map((file, index) => (
              <div key={index} className="col-md-4 mb-4">
                {file.endsWith(".mp4") ? (
                  <video
                    src={file}
                    controls
                    className="w-100 rounded shadow-sm"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                ) : (
                  <img
                    src={file}
                    alt={`Attachment ${index + 1}`}
                    className="w-100 rounded shadow-sm"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-5">
        <h4 className="fw-bold text-primary mb-3">💬 Comments</h4>
        <ul className="list-unstyled mb-4">
          {(incident.comments || []).map((c, i) => (
            <li
              key={i}
              className={`rounded p-3 mb-2 shadow-sm ${
                isDarkMode
                  ? "bg-secondary text-light border border-light"
                  : "bg-light text-dark"
              }`}
            >
              {c}
            </li>
          ))}
        </ul>

        <Form onSubmit={handleAddComment}>
          <Form.Control
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className={`mb-3 ${
              isDarkMode ? "bg-dark text-light border-light" : ""
            }`}
          />
          <Button type="submit" variant="primary">
            Add Comment
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default IncidentDetail;
