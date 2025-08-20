import "./Sidebar.css";
import React, { useState } from "react";
import { useUI } from "./context/UIContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ userRole }) {
  const [expanded, setExpanded] = useState(false);
  const { isSidebarOpen } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`sidebar ${expanded ? "expanded" : "collapsed"} ${isSidebarOpen ? "open" : ""}`} onClick={(e)=>{ e.stopPropagation(); }}>
      <ul className="menu">
        {userRole === "regularUser" && (
          <>
            <li
              onClick={() => navigate("/")}
              className={location.pathname === "/" ? "active" : ""}
            >
              <span className="emoji" aria-hidden>🗓️</span>
              <span className="label">Workshops</span>
            </li>
            <li
              onClick={() => navigate("/create")}
              className={location.pathname === "/create" ? "active" : ""}
            >
              <span className="emoji" aria-hidden>✨</span>
              <span className="label">Create Event</span>
            </li>
            <li
              onClick={() => navigate("/profile")}
              className={location.pathname === "/profile" ? "active" : ""}
            >
              <span className="emoji" aria-hidden>👤</span>
              <span className="label">Profile</span>
            </li>
            <li
              onClick={() => navigate("/spaces")}
              className={location.pathname === "/spaces" ? "active" : ""}
            >
              <span className="emoji" aria-hidden>🏢</span>
              <span className="label">Spaces</span>
            </li>
            <li
              onClick={() => navigate("/user-booking")}
              className={location.pathname === "/user-booking" ? "active" : ""}
            >
              <span className="emoji" aria-hidden>🧾</span>
              <span className="label">Booking</span>
            </li>
            <li
              onClick={() => navigate("/profile")}
              className={location.pathname === "/profile" ? "active" : ""}
            >
              <span className="emoji" aria-hidden>👥</span>
              <span className="label">My Groups</span>
            </li>
            <li
              onClick={() => navigate("/profile")}
              className={location.pathname === "/profile" ? "active" : ""}
            >
              <span className="emoji" aria-hidden>🧭</span>
              <span className="label">Explore</span>
            </li>
          </>
        )}
        {userRole === "spaceOwner" && (
          <>
            <li
              onClick={() => navigate("/")}
              className={location.pathname === "/" ? "active" : ""}
            >
              <span className="emoji" aria-hidden>🗓️</span>
              <span className="label">Workshops</span>
            </li>
            <li
              onClick={() => navigate("/create")}
              className={location.pathname === "/create" ? "active" : ""}
            >
              <span className="emoji" aria-hidden>✨</span>
              <span className="label">Create Event</span>
            </li>
            <li
              onClick={() => navigate("/my-space")}
              className={location.pathname === "/my-space" ? "active" : ""}
            >
              <span className="emoji" aria-hidden>📋</span>
              <span className="label">Bookings</span>
            </li>
            <li
              onClick={() => navigate("/approval")}
              className={location.pathname === "/approval" ? "active" : ""}
            >
              <span className="emoji" aria-hidden>✅</span>
              <span className="label">Requests</span>
            </li>
          </>
        )}
      </ul>
      <div className="bottom-bar">
        <span className="user-label">Guest User</span>
        <button
          className="toggle-btn"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? "«" : "»"}
        </button>
      </div>
    </div>
  );
}
