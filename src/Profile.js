// Profile.js
import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { role, firstName, lastName, email, phone, isAuthenticated } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user });

  // Use data from login response
  useEffect(() => {
    if (!isAuthenticated) {
      setError("Please login to view your profile");
      setLoading(false);
      return;
    }

    // Use data from login response
    const displayName = firstName && lastName ? `${firstName} ${lastName}` : (firstName || lastName || "Name not available");
    
    setUser({
      name: displayName,
      email: email || "Email not available",
      phone: phone || "Phone not available"
    });
    setForm({
      name: displayName,
      email: email || "Email not available",
      phone: phone || "Phone not available"
    });
    setLoading(false);
    
    console.log("Profile component - Available auth data:", {
      isAuthenticated,
      role,
      firstName,
      lastName,
      email,
      phone,
      displayName
    });
  }, [isAuthenticated, firstName, lastName, email, phone, role]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // TODO: Send updated info to backend API
      // For now, just update local state
      setUser({ ...form });
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <h1>My Profile</h1>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <h1>My Profile</h1>
        <p style={{ color: "#ef4444" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <div className="profile-row">
        <label>Name:</label>
        {editing ? (
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        ) : (
          <span>{user.name || "Not available"}</span>
        )}
      </div>

      <div className="profile-row">
        <label>Email:</label>
        {editing ? (
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        ) : (
          <span>{user.email || "Not available"}</span>
        )}
      </div>

      <div className="profile-row">
        <label>Phone:</label>
        {editing ? (
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        ) : (
          <span>{user.phone || "Not available"}</span>
        )}
      </div>

      <div className="profile-actions">
        {editing ? (
          <>
            <button onClick={handleSave} className="btn save">
              Save
            </button>
            <button onClick={() => setEditing(false)} className="btn cancel">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setEditing(true)} className="btn edit">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
