import "./Sidebar.css";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
      {expanded ? (
        <ul className="menu">
          <li
            onClick={() => navigate("/")}
            className={location.pathname === "/" ? "active" : ""}
          >
            Workshops
          </li>
          <li
            onClick={() => navigate("/create")}
            className={location.pathname === "/create" ? "active" : ""}
          >
            Create Event
          </li>
          <li
            onClick={() => navigate("/profile")}
            className={location.pathname === "/profile" ? "active" : ""}
          >
            Profile
          </li>
          <li
            onClick={() => navigate("/my-space")}
            className={location.pathname === "/my-space" ? "active" : ""}
          >
            Bookings (Space)
          </li>
          <li
            onClick={() => navigate("/spaces")}
            className={location.pathname === "/spaces" ? "active" : ""}
          >
            Spaces
          </li>
          <li
            onClick={() => navigate("/user-booking")}
            className={location.pathname === "/user-booking" ? "active" : ""}
          >
            Booking (User)
          </li>
          <li
            onClick={() => navigate("/approval")}
            className={location.pathname === "/approval" ? "active" : ""}
          >
            Requests
          </li>
          <li
            onClick={() => navigate("/profile")}
            className={location.pathname === "/profile" ? "active" : ""}
          >
            My Groups
          </li>
          <li
            onClick={() => navigate("/profile")}
            className={location.pathname === "/profile" ? "active" : ""}
          >
            Explore
          </li>
        </ul>
      ) : (
        <div className="menu-spacer"></div>
      )}
      <div className="bottom-bar">
        {expanded && <span className="user-label">Guest User</span>}
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
