import "./Sidebar.css";
import React, { useState } from "react";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
      {expanded ? (
        <ul className="menu">
          <li>Workshops</li>
          <li>Create Event</li>
          <li>Profile</li>
          <li>Space</li>
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