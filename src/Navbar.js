// src/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useUI } from "./context/UIContext";
import { useAuth } from "./context/AuthContext";

export default function Navbar({ userRole, toggleRole, theme, toggleTheme }) {
  const { toggleSidebar } = useUI();
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="navbar">
      <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle sidebar">☰</button>
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
        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button className="role-toggle" onClick={logout}>Logout</button>
        )}
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/spaces">Spaces</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}
