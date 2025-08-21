import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Hero from "./components/Hero";

export function LoginPage() {
  const { login, setRole } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [chosenRole, setChosenRole] = useState("REGULAR_USER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ username, password, chosenRole });
      setRole(chosenRole);
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Hero title="Sign in" subtitle="Access your account" />
      <form onSubmit={onSubmit} className="workshop-form">
        {error && <p style={{ color: "#ef4444" }}>{error}</p>}
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Role
          <select value={chosenRole} onChange={(e) => setChosenRole(e.target.value)}>
            <option value="REGULAR_USER">Regular User</option>
            <option value="SPACE_OWNER">Space Owner</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
      </form>
    </div>
  );
}

export function RegisterPage() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("REGULAR_USER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      await register({ username, password, role });
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Hero title="Create an account" subtitle="Register to continue" />
      <form onSubmit={onSubmit} className="workshop-form">
        {error && <p style={{ color: "#ef4444" }}>{error}</p>}
        {success && <p style={{ color: "#22c55e" }}>Registration successful. You can now login.</p>}
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="REGULAR_USER">Regular User</option>
            <option value="SPACE_OWNER">Space Owner</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>
    </div>
  );
}


