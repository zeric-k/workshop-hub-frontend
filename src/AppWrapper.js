import React, { useEffect, useState } from "react";
import App from "./App";
import { UIProvider } from "./context/UIContext";
import { ToastProvider } from "./components/Toast";

export default function AppWrapper() {
  const [userRole, setUserRole] = useState("regularUser");
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark"
  );

  const toggleRole = () => {
    setUserRole((prev) =>
      prev === "regularUser" ? "spaceOwner" : "regularUser"
    );
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <UIProvider>
      <ToastProvider>
        <App userRole={userRole} toggleRole={toggleRole} theme={theme} toggleTheme={toggleTheme} />
      </ToastProvider>
    </UIProvider>
  );
}
