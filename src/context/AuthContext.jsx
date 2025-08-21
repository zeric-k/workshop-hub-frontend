import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token") || null;
  });
  const [role, setRole] = useState(() => {
    if (typeof window === "undefined") return "REGULAR_USER";
    return localStorage.getItem("auth_role") || "REGULAR_USER";
  });

  const isAuthenticated = !!token;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (token) localStorage.setItem("auth_token", token);
    else localStorage.removeItem("auth_token");
  }, [token]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (role) localStorage.setItem("auth_role", role);
  }, [role]);

  const login = useCallback(async ({ username, password, chosenRole }) => {
    const res = await fetch(
      "https://dev-workshops-service-fgdpf6amcahzhuge.centralindia-01.azurewebsites.net/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    // API returns { token: "Bearer abc..." }
    setToken(data.token || null);
    // Persist UI role choice (REGULAR_USER | SPACE_OWNER) for client-side gating
    if (chosenRole) setRole(chosenRole);
    return true;
  }, []);

  const register = useCallback(async ({ username, password, role: registerRole }) => {
    const res = await fetch(
      "https://dev-workshops-service-fgdpf6amcahzhuge.centralindia-01.azurewebsites.net/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role: registerRole }),
      }
    );
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Registration failed");
    }
    return true;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({ token, isAuthenticated, role, setRole, login, register, logout }),
    [token, isAuthenticated, role, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


