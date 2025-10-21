import React from "react";
import { Container } from "react-bootstrap";

export default function AboutPage() {
  return (
    <div className="auth-bg">
    <Container className="mt-5 p-4 rounded shadow text-white">
      <h3>About PulseStream</h3>
      <p>PulseStream lets users post and view incidents happening around them.
        Live streaming and photos are also supported, making it easy to share real-time updates with the community.
        Share your experiences and stay informed with PulseStream.</p>
    </Container>
    </div>
  );
}
