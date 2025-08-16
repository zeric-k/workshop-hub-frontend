// UserBooking.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserBooking.css";

export default function UserBooking() {
  const navigate = useNavigate();

  const [bookingType, setBookingType] = useState(""); // "space" or "datetime"
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState("");

  const [availableSpaces, setAvailableSpaces] = useState([]);

  // Fetch all spaces
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await fetch(
          "https://dev-workshops-service-fgdpf6amcahzhuge.centralindia-01.azurewebsites.net/api/v1/spaces?pageNo=1&pageSize=100"
        );
        const data = await res.json();
        setSpaces(data.payload.spaces || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSpaces();
  }, []);

  // Handle booking by space
  const handleSpaceBooking = () => {
    if (!selectedSpace) {
      alert("Please select a space!");
      return;
    }
    navigate(`/spaces/${selectedSpace}/book`);
  };

  // Handle booking by date & time
  const handleDateTimeBooking = () => {
    if (!date || !time) {
      alert("Please select both date and time!");
      return;
    }
    // Filter spaces available in this slot
    const available = spaces.filter((s, i) => i % 2 === 0); // Example: dummy logic
    setAvailableSpaces(available);
  };

  return (
    <div className="user-booking-container">
      <h1>User Booking</h1>

      {!bookingType && (
        <div className="booking-type-selection">
          <h3>How do you want to book?</h3>
          <label>
            <input
              type="radio"
              name="bookingType"
              value="space"
              onChange={(e) => setBookingType(e.target.value)}
            />
            By Space
          </label>
          <label>
            <input
              type="radio"
              name="bookingType"
              value="datetime"
              onChange={(e) => setBookingType(e.target.value)}
            />
            By Date & Time
          </label>
        </div>
      )}

      {/* Booking by Space */}
      {bookingType === "space" && (
        <div className="booking-section">
          <h3>Select Space:</h3>
          <select
            value={selectedSpace}
            onChange={(e) => setSelectedSpace(e.target.value)}
          >
            <option value="">-- Select a Space --</option>
            {spaces.map((s) => (
              <option key={s.id} value={s.id}>
                {s.space}
              </option>
            ))}
          </select>
          <button className="book-btn" onClick={handleSpaceBooking}>
            Book Slot
          </button>
          <button
            className="back-btn"
            onClick={() => setBookingType("")}
          >
            Back
          </button>
        </div>
      )}

      {/* Booking by Date & Time */}
      {bookingType === "datetime" && (
        <div className="booking-section">
          <h3>Select Date & Time:</h3>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button className="book-btn" onClick={handleDateTimeBooking}>
            Check Availability
          </button>
          <button
            className="back-btn"
            onClick={() => setBookingType("")}
          >
            Back
          </button>

          {/* List available spaces */}
          {availableSpaces.length > 0 && (
            <div className="available-spaces">
              <h4>Available Spaces:</h4>
              {availableSpaces.map((s) => (
                <div key={s.id} className="space-card">
                  <span>{s.space}</span>
                  <button
                    className="book-btn"
                    onClick={() => navigate(`/spaces/${s.id}/book`)}
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
