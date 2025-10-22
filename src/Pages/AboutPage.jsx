import React from "react";

export default function AboutPage() {
  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">💡 About Pulsestream</h3>
        <p>
          <strong>Pulsestream</strong> is a simple global incident reporting and viewing platform
          designed to let users share real-time events around the world.  
        </p>
        <p>
          Built using <b>React + Bootstrap</b> and powered by a lightweight <b>JSON server</b>,
          it demonstrates how user interaction, multimedia posts, and modern design
          can blend seamlessly in a single web app.
        </p>
        <p className="text-muted text-center mt-3">
          Made with by Ian Harding
        </p>
      </div>
    </div>
  );
}
