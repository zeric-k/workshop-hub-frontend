import "./Sidebar.css";
import React, { useState } from "react";

export default function Sidebar() {
const [expanded, setExpanded] = useState(false);
  return (
    <div className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
      

      {expanded && (
        <ul className="menu">
          <li>Workshops</li>
          <li>Create Event</li>
          <li>Profile</li>
          <li>Space</li>
        </ul>
      )}
      <button 
        className="toggle-btn" 
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "« «" : "»"}
      </button>
    </div>
  );
}
