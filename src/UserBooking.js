// UserBooking.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { listUserPayments } from "./api";
import "./UserBooking.css";

export default function UserBooking() {
  const navigate = useNavigate();
  const { isAuthenticated, token, userId } = useAuth();

  const [bookingType, setBookingType] = useState(""); // "space" or "datetime"
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState("");

  const [availableSpaces, setAvailableSpaces] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(false);

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

  // Load user's past bookings/payments
  useEffect(() => {
    const loadPayments = async () => {
      if (!isAuthenticated || !userId) return;
      setLoadingPayments(true);
      try {
        const res = await listUserPayments({ token, userId });
        setPayments(Array.isArray(res) ? res : []);
      } catch (e) {
        console.error("Failed to load payments", e);
      } finally {
        setLoadingPayments(false);
      }
    };
    loadPayments();
  }, [isAuthenticated, token, userId]);

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
      <div className="hero card-surface" style={{ marginBottom: 16 }}>
        <div>
          <h1>User Booking</h1>
          <p className="subtitle">Book by space or by date & time.</p>
        </div>
      </div>

      {!bookingType && (
        <div className="booking-type-selection card-surface" style={{ padding: 16 }}>
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
        <div className="booking-section card-surface" style={{ padding: 16 }}>
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
        <div className="booking-section card-surface" style={{ padding: 16 }}>
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

      {/* Past bookings */}
      <div className="card-surface" style={{ padding: 16, marginTop: 16 }}>
        <h3 className="title">Your Payments</h3>
        {loadingPayments ? (
          <p>Loading...</p>
        ) : payments.length === 0 ? (
          <p className="info">No payments yet.</p>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {payments.map((p) => (
              <div key={p.id} className="card-surface" style={{ padding: 12 }}>
                <div className="info"><strong>Workshop ID:</strong> {p.workshopId}</div>
                <div className="info"><strong>Amount:</strong> ₹{p.amount}</div>
                <div className="info"><strong>Status:</strong> {p.status}</div>
                <div className="info"><strong>Reference:</strong> {p.paymentReference}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
