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
  const [spaceName, setSpaceName] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_space_name") || null;
  });
  const [firstName, setFirstName] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_first_name") || null;
  });
  const [lastName, setLastName] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_last_name") || null;
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (spaceName) localStorage.setItem("auth_space_name", spaceName);
    else localStorage.removeItem("auth_space_name");
  }, [spaceName]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (firstName) localStorage.setItem("auth_first_name", firstName);
    else localStorage.removeItem("auth_first_name");
  }, [firstName]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (lastName) localStorage.setItem("auth_last_name", lastName);
    else localStorage.removeItem("auth_last_name");
  }, [lastName]);

  const login = useCallback(async ({ username, password }) => {
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
    // API returns { token: "<jwt>", role: "SPACE_OWNER" | "REGULAR_USER", spaceName?: "string", firstName?: "string", lastName?: "string" }
    const receivedToken = data.token || null;
    const normalizedToken = receivedToken
      ? (receivedToken.startsWith("Bearer ") ? receivedToken : `Bearer ${receivedToken}`)
      : null;
    setToken(normalizedToken);
    if (data.role) setRole(data.role);
    if (data.spaceName) setSpaceName(data.spaceName);
    if (data.firstName) setFirstName(data.firstName);
    if (data.lastName) setLastName(data.lastName);
    return true;
  }, []);

  const register = useCallback(async (payload) => {
    if (!payload || !payload.username || !payload.password || !payload.role) {
      throw new Error("username, password and role are required");
    }
    const res = await fetch(
      "https://dev-workshops-service-fgdpf6amcahzhuge.centralindia-01.azurewebsites.net/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    setSpaceName(null);
    setFirstName(null);
    setLastName(null);
  }, []);

  const value = useMemo(
    () => ({ token, isAuthenticated, role, spaceName, firstName, lastName, setRole, login, register, logout }),
    [token, isAuthenticated, role, spaceName, firstName, lastName, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


