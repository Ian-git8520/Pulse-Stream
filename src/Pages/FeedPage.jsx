import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const FeedPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [activeCommentBox, setActiveCommentBox] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3080/incidents")
      .then((res) => res.json())
      .then(setIncidents)
      .catch(console.error);
  }, []);

  const handleLike = (id, currentLikes = 0) => {
    const newLikes = currentLikes + 1;
    fetch(`http://localhost:3080/incidents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: newLikes }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setIncidents((prev) =>
          prev.map((item) => (item.id === id ? updated : item))
        );
      })
      .catch(console.error);
  };

  const toggleCommentBox = (id) => {
    setActiveCommentBox(activeCommentBox === id ? null : id);
  };

  const handleAddComment = (id) => {
    if (!commentText.trim()) return;
    const targetPost = incidents.find((p) => p.id === id);
    const newComments = [...(targetPost.comments || []), commentText];

    fetch(`http://localhost:3080/incidents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comments: newComments }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setIncidents((prev) =>
          prev.map((item) => (item.id === id ? updated : item))
        );
        setCommentText("");
      })
      .catch(console.error);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold text-primary">
        🌍 Global Incident Feed
      </h2>
      <div className="row">
        {incidents.map((incident) => (
          <div key={incident.id} className="col-lg-4 col-md-6 mb-4 d-flex">
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden w-100">
              <Link
                to={`/incident/${incident.id}`}
                className="text-decoration-none text-dark"
              >
                {incident.attachments && incident.attachments.length > 0 ? (
                  incident.attachments[0].endsWith(".mp4") ? (
                    <video
                      src={incident.attachments[0]}
                      controls
                      className="w-100"
                      style={{
                        height: "300px",
                        objectFit: "cover",
                        borderBottom: "3px solid #007bff",
                      }}
                    />
                  ) : (
                    <Card.Img
                      variant="top"
                      src={incident.attachments[0]}
                      alt="Incident"
                      className="w-100"
                      style={{
                        height: "300px",
                        objectFit: "cover",
                        borderBottom: "3px solid #007bff",
                      }}
                    />
                  )
                ) : (
                  <div
                    className="bg-secondary text-white d-flex align-items-center justify-content-center"
                    style={{
                      height: "300px",
                      fontSize: "1.2rem",
                      fontWeight: "500",
                    }}
                  >
                    No Image or Video Available
                  </div>
                )}
              </Link>

              <Card.Body className="p-4">
                <Link
                  to={`/incident/${incident.id}`}
                  className="text-decoration-none text-dark"
                >
                  <Card.Title className="fw-bold text-primary mt-3 mb-3">
                    {incident.type}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {incident.location}
                  </Card.Subtitle>
                  <Card.Text>{incident.description}</Card.Text>

                  <Card.Subtitle className="mb-2 text-muted small">
                    {incident.datetime}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted small">
                    {incident.date}
                  </Card.Subtitle>
                </Link>

                <div className="d-flex justify-content-between align-items-center mb-2 mt-3">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleLike(incident.id, incident.likes || 0)}
                  >
                    👍 {incident.likes || 0}
                  </Button>

                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => toggleCommentBox(incident.id)}
                  >
                    💬 Comment
                  </Button>
                </div>

                {activeCommentBox === incident.id && (
                  <div className="mt-3 border-top pt-3">
                    <h6>Comments:</h6>
                    <ul className="list-unstyled">
                      {(incident.comments || []).map((c, i) => (
                        <li key={i} className="bg-light rounded p-2 mb-2">
                          {c}
                        </li>
                      ))}
                    </ul>

                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddComment(incident.id);
                      }}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="mb-2"
                      />
                      <Button variant="primary" type="submit" size="sm">
                        Add Comment
                      </Button>
                    </Form>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
