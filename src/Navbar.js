// src/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ userRole, toggleRole, theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="logo">ChoreoHub</div>
      <div className="navbar-right">
        <button className="role-toggle" onClick={toggleRole}>
          {userRole === "regularUser" ? "User" : "Space Owner"}
        </button>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/spaces">Spaces</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}
