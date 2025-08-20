import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Select.css";

export default function Select({
  value,
  options,
  onChange,
  placeholder = "Select...",
  disabled = false,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);

  const normalizedOptions = useMemo(
    () => options.map((opt) =>
      typeof opt === "object" && opt !== null
        ? opt
        : { label: String(opt), value: opt }
    ),
    [options]
  );

  const selected = useMemo(
    () => normalizedOptions.find((o) => o.value === value) || null,
    [normalizedOptions, value]
  );

  useEffect(() => {
    const onDocClick = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlightedIndex((i) => Math.min(normalizedOptions.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setHighlightedIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (highlightedIndex >= 0) {
        const opt = normalizedOptions[highlightedIndex];
        onChange?.(opt.value);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`ui-select ${open ? "open" : ""} ${disabled ? "disabled" : ""} ${className}`}
      tabIndex={disabled ? -1 : 0}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className="ui-select-trigger"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
      >
        <span className={`value ${selected ? "" : "placeholder"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="chevron" aria-hidden>▾</span>
      </button>
      {open && (
        <ul className="ui-select-menu" role="listbox">
          {normalizedOptions.map((opt, idx) => {
            const isSelected = selected && selected.value === opt.value;
            const isHighlighted = highlightedIndex === idx;
            return (
              <li
                key={String(opt.value)}
                role="option"
                aria-selected={isSelected}
                className={`item ${isSelected ? "selected" : ""} ${isHighlighted ? "highlighted" : ""}`}
                onMouseEnter={() => setHighlightedIndex(idx)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                }}
              >
                <span className="label">{opt.label}</span>
                {isSelected ? <span className="check" aria-hidden>✓</span> : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}


