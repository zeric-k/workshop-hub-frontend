// Profile.js
import React, { useState } from "react";
import "./Profile.css";

export default function Profile() {
  // Dummy logged-in user data (replace with API call)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
  });

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser({ ...form });
    setEditing(false);
    alert("Profile updated successfully!");
    // TODO: Send updated info to backend API
  };

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
          <span>{user.name}</span>
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
          <span>{user.email}</span>
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
          <span>{user.phone}</span>
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
