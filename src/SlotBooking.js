// SlotBooking.js
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./SlotBooking.css";

export default function SlotBooking() {
  const { spaceId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const spaceName = state?.spaceName || `Space ${spaceId}`;

  // State
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  // Dummy slots (Playo-style: every hour or half-hour)
  const slots = [
    "09:00 AM", "09:30 AM",
    "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM",
    "06:00 PM", "06:30 PM",
  ];

  const handleBooking = () => {
    if (!date || !slot) {
      alert("Please select both a date and time slot!");
      return;
    }

    alert(`✅ Slot booked for Space ${spaceId} on ${date} at ${slot}`);
    navigate("/spaces");
  };

  return (
    <div className="slot-booking-container">
      <h1 className="slot-title">Book a Slot</h1>
      <p className="slot-space">Space: <strong>{spaceName}</strong></p>

      {/* Date Picker */}
      <label className="slot-label">Select Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="slot-date-picker"
      />

      {/* Time Slots Grid */}
      <label className="slot-label">Select Time Slot:</label>
      <div className="slot-grid">
        {slots.map((s, i) => (
          <button
            key={i}
            className={`slot-button ${slot === s ? "selected" : ""}`}
            onClick={() => setSlot(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Confirm Button */}
      <button onClick={handleBooking} className="confirm-button">
        Confirm Booking
      </button>
    </div>
  );
}
