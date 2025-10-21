import React from "react";
import { Card } from "react-bootstrap";

function Profile() {
  return (
    <div className="container mt-4 text-center">
      <Card className="p-4 shadow-sm mx-auto" style={{ maxWidth: "400px" }}>
        <Card.Img
          variant="top"
          src="https://res.cloudinary.com/doehtbdil/image/upload/v1729535500/sample.jpg"
          className="rounded-circle mx-auto"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>Ian David</Card.Title>
          <Card.Text>
            Passionate about community safety and awareness 🌍  
            <br />
            <strong>Email:</strong> ian.david@example.com
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
