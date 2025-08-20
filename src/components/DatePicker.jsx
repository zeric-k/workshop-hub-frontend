import React, { useEffect, useMemo, useRef, useState } from "react";
import "./DatePicker.css";

function formatYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseYMD(value) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function getMonthData(year, month) {
  const firstDay = new Date(year, month, 1);
  const startDay = new Date(firstDay);
  const weekday = firstDay.getDay(); // 0 Sun - 6 Sat
  // We want weeks starting Mon (Mon=1..Sun=7)
  const shift = (weekday + 6) % 7; // convert to Mon-start index
  startDay.setDate(firstDay.getDate() - shift);

  const weeks = [];
  for (let w = 0; w < 6; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDay);
      date.setDate(startDay.getDate() + w * 7 + d);
      days.push(date);
    }
    weeks.push(days);
  }
  return weeks;
}

export default function DatePicker({ value, onChange, placeholder = "Pick a date", className = "" }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const selectedDate = useMemo(() => parseYMD(value), [value]);
  const today = new Date();
  const [viewYear, setViewYear] = useState(() => (selectedDate ? selectedDate.getFullYear() : today.getFullYear()));
  const [viewMonth, setViewMonth] = useState(() => (selectedDate ? selectedDate.getMonth() : today.getMonth()));

  const monthMatrix = useMemo(() => getMonthData(viewYear, viewMonth), [viewYear, viewMonth]);
  const monthLabel = useMemo(() => new Date(viewYear, viewMonth, 1).toLocaleString(undefined, { month: "long", year: "numeric" }), [viewYear, viewMonth]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const gotoPrevMonth = () => {
    const d = new Date(viewYear, viewMonth, 1);
    d.setMonth(d.getMonth() - 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };
  const gotoNextMonth = () => {
    const d = new Date(viewYear, viewMonth, 1);
    d.setMonth(d.getMonth() + 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const selectDate = (date) => {
    onChange?.(formatYMD(date));
    setOpen(false);
  };

  return (
    <div className={`ui-datepicker ${open ? "open" : ""} ${className}`} ref={containerRef}>
      <button type="button" className="ui-datepicker-trigger" onClick={() => setOpen((o) => !o)}>
        <span className={`value ${selectedDate ? "" : "placeholder"}`}>{selectedDate ? formatYMD(selectedDate) : placeholder}</span>
        <span className="calendar" aria-hidden>📅</span>
      </button>
      {open && (
        <div className="ui-datepicker-popover">
          <div className="header">
            <button type="button" className="nav" onClick={gotoPrevMonth} aria-label="Previous month">‹</button>
            <div className="month-label">{monthLabel}</div>
            <button type="button" className="nav" onClick={gotoNextMonth} aria-label="Next month">›</button>
          </div>
          <div className="grid">
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
              <div key={d} className="dow">{d}</div>
            ))}
            {monthMatrix.flat().map((d, idx) => {
              const isOtherMonth = d.getMonth() !== viewMonth;
              const isToday = d.toDateString() === today.toDateString();
              const isSelected = selectedDate && d.toDateString() === selectedDate.toDateString();
              return (
                <button
                  key={idx}
                  type="button"
                  className={`cell ${isOtherMonth ? "other" : ""} ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
                  onClick={() => selectDate(d)}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


