// MySpace.js
import React, { useState, useEffect } from "react";
import "./MySpace.css";

export default function MySpace() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [slots, setSlots] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [autoApprove, setAutoApprove] = useState(true);

  
useEffect(() => {
  const generateSlots = () => {
    const times = [];
    let hour = 7;
    let minute = 0;
    const bookedSlotsData = ["09:00 AM - 10:00 AM", "01:30 PM - 02:30 PM"];
    while (hour < 19 || (hour === 19 && minute === 0)) {
      const start = `${hour < 10 ? "0" + hour : hour}:${minute === 0 ? "00" : "30"}`;
      let endHour = minute === 0 ? hour : hour + 1;
      let endMinute = minute === 0 ? "30" : "00";
      const end = `${endHour < 10 ? "0" + endHour : endHour}:${endMinute}`;
      const ampmStart = hour >= 12 ? "PM" : "AM";
      const ampmEnd = endHour >= 12 ? "PM" : "AM";
      const timeRange = `${start} ${ampmStart} - ${end} ${ampmEnd}`;

      times.push({
        time: timeRange,
        booked: bookedSlotsData.includes(timeRange),
        available: !bookedSlotsData.includes(timeRange),
      });

      if (minute === 0) minute = 30;
      else {
        minute = 0;
        hour++;
      }
    }
    setSlots(times);
  };

  generateSlots();
}, [date]); // only depends on date


  return (
    <div className="my-space-container">
      <div className="header-row">
        <div>
          <h1>Bookings</h1>
        </div>

        {/* Toggle on the right */}
        <div className="toggle-container small">
            <label className="toggle-label">Auto Approve</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={autoApprove}
              onChange={() => setAutoApprove(!autoApprove)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <label className="slot-label">Select Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="slot-date-picker"
      />

      {date && (
        <div className="timeline-wrapper">
          <div className="timeline-bar">
            {slots.map((slot, i) => {
              const isHovered = hoverIndex === i || hoverIndex === i - 1;
              return (
                <div
                  key={i}
                  className={`timeline-slot ${
                    slot.booked
                      ? "booked"
                      : isHovered
                      ? "hovered"
                      : slot.available
                      ? "available"
                      : "neutral"
                  }`}
                  title={slot.time}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                />
              );
            })}

            {slots.map((_, i) => (
              <div
                key={i}
                className="timeline-marker"
                style={{ left: `${(i / slots.length) * 100}%` }}
              />
            ))}
          </div>

          <div className="timeline-labels">
            {slots.map((_, i) => {
              if (i % 2 !== 0) return null;
              const hour = 7 + Math.floor(i / 2);
              const displayHour = hour > 12 ? hour - 12 : hour;
              const ampm = hour >= 12 ? "PM" : "AM";
              return (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${(i / slots.length) * 100}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {displayHour} {ampm}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
