import React, { useEffect, useMemo, useRef, useState, useId } from "react";
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
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [placement, setPlacement] = useState("bottom");
  const listboxId = useId();

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

  // Compute menu placement (top/bottom) when opening and on viewport changes
  useEffect(() => {
    if (!open) return;
    const computePlacement = () => {
      if (!containerRef.current) return;
      const triggerRect = containerRef.current.getBoundingClientRect();
      const menuH = menuRef.current ? menuRef.current.offsetHeight : 260;
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      if (spaceBelow < menuH + 12 && spaceAbove > spaceBelow) {
        setPlacement("top");
      } else {
        setPlacement("bottom");
      }
    };
    // compute after render paint
    const id = requestAnimationFrame(computePlacement);
    window.addEventListener("resize", computePlacement);
    window.addEventListener("scroll", computePlacement, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", computePlacement);
      window.removeEventListener("scroll", computePlacement);
    };
  }, [open]);

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
      } else {
        // If open but nothing highlighted, close to avoid staying open
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`ui-select ${open ? "open" : ""} ${placement} ${disabled ? "disabled" : ""} ${className}`}
      tabIndex={disabled ? -1 : 0}
      role="combobox"
      aria-controls={listboxId}
      aria-expanded={open}
      aria-haspopup="listbox"
      onKeyDown={handleKeyDown}
      onBlur={(e) => {
        if (!containerRef.current) return;
        if (!containerRef.current.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
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
        <ul id={listboxId} ref={menuRef} className="ui-select-menu" role="listbox">
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
                onClick={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                  // move focus away to ensure the menu doesn't immediately reopen
                  requestAnimationFrame(() => {
                    try { buttonRef.current && buttonRef.current.blur(); } catch {}
                  });
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


