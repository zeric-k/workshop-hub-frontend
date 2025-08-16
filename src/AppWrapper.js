import React, { useState } from "react";
import App from "./App";

export default function AppWrapper() {
  const [userRole, setUserRole] = useState("regularUser");

  const toggleRole = () => {
    setUserRole((prev) =>
      prev === "regularUser" ? "spaceOwner" : "regularUser"
    );
  };

  return <App userRole={userRole} toggleRole={toggleRole} />;
}
