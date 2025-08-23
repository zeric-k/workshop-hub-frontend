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
  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_email") || null;
  });
  const [phone, setPhone] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_phone") || null;
  });
  const [userId, setUserId] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_user_id") || null;
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (email) localStorage.setItem("auth_email", email);
    else localStorage.removeItem("auth_email");
  }, [email]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (phone) localStorage.setItem("auth_phone", phone);
    else localStorage.removeItem("auth_phone");
  }, [phone]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (userId) localStorage.setItem("auth_user_id", userId);
    else localStorage.removeItem("auth_user_id");
  }, [userId]);

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
    // API returns { token, role, spaceName?, firstName?, lastName?, email?, phone?, userId? }
    const receivedToken = data.token || null;
    const normalizedToken = receivedToken
      ? (receivedToken.startsWith("Bearer ") ? receivedToken : `Bearer ${receivedToken}`)
      : null;
    setToken(normalizedToken);
    if (data.role) setRole(data.role);
    if (data.spaceName) setSpaceName(data.spaceName);
    if (data.firstName) setFirstName(data.firstName);
    if (data.lastName) setLastName(data.lastName);
    if (data.email) setEmail(data.email);
    if (data.phone) setPhone(data.phone);
    // Support both userId and id keys from backend
    const uid = data.userId ?? data.id;
    if (uid !== undefined && uid !== null && uid !== "") setUserId(String(uid));
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
    setEmail(null);
    setPhone(null);
    setUserId(null);
  }, []);

  const value = useMemo(
    () => ({ token, isAuthenticated, role, spaceName, firstName, lastName, email, phone, userId, setRole, login, register, logout }),
    [token, isAuthenticated, role, spaceName, firstName, lastName, email, phone, userId, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


