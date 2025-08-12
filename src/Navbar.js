// src/Navbar.js
import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Dance Arena</div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/Sign In">Sign In</a>
        <br></br>
      </div>
    </nav>
  );
}
