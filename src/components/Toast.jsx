import React, { createContext, useContext, useMemo, useState } from "react";
import "./Toast.css";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = (message, opts = {}) => {
    const id = Math.random().toString(36).slice(2);
    const toast = { id, message, type: opts.type || "info", duration: opts.duration || 2500 };
    setToasts((t) => [...t, toast]);
    setTimeout(() => dismiss(id), toast.duration);
  };
  const dismiss = (id) => setToasts((t) => t.filter((x) => x.id !== id));
  const value = useMemo(() => ({ push, dismiss }), []);
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`} onClick={() => dismiss(t.id)}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}


