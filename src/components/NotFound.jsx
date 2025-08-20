import React from "react";

export default function NotFound() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <h1>Page not found</h1>
        <p className="subtitle">The page you’re looking for doesn’t exist.</p>
        <a className="link" href="/">Go home</a>
      </div>
    </div>
  );
}


