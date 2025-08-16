// src/Navbar.js
import React from "react";
import "./Navbar.css";

export default function Navbar({ userRole, toggleRole }) {
  return (
    <nav className="navbar">
      <div className="logo">Elevare</div>
      <div className="navbar-right">
        <button className="role-toggle" onClick={toggleRole}>
          {userRole === "regularUser" ? "User" : "Space Owner"}
        </button>
      </div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/Sign In">Sign In</a>
        <br></br>
      </div>
    </nav>
  );
}
