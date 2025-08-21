import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Hero from "./components/Hero";
import Select from "./components/Select";

export function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateUsername = (username) => {
    if (username.length <= 3) {
      return "Username must be more than 3 characters";
    }
    if (/\d/.test(username)) {
      return "Username cannot contain digits";
    }
    if (!/^[a-zA-Z_-]+$/.test(username)) {
      return "Username can only contain letters, underscores (_), and hyphens (-)";
    }
    return null;
  };

  const validatePassword = (password) => {
    if (password.length <= 5) {
      return "Password must be more than 5 characters";
    }
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate username
    const usernameError = validateUsername(username);
    if (usernameError) {
      setError(usernameError);
      return;
    }
    
    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    
    setLoading(true);
    try {
      await login({ username, password });
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
        
        <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
      </form>
      <p style={{ marginTop: 12 }}>
        Not registered? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export function RegisterPage() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("REGULAR_USER");
  // User fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneLocal, setPhoneLocal] = useState("");
  // Space owner fields
  const [spaceName, setSpaceName] = useState("");
  const [mapQuery, setMapQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateUsername = (username) => {
    if (username.length <= 3) {
      return "Username must be more than 3 characters";
    }
    if (/\d/.test(username)) {
      return "Username cannot contain digits";
    }
    if (!/^[a-zA-Z_-]+$/.test(username)) {
      return "Username can only contain letters, underscores (_), and hyphens (-)";
    }
    return null;
  };

  const validatePassword = (password) => {
    if (password.length <= 5) {
      return "Password must be more than 5 characters";
    }
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    // Validate username
    const usernameError = validateUsername(username);
    if (usernameError) {
      setError(usernameError);
      return;
    }
    
    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    
    setLoading(true);
    try {
      const payload = { username, password, role };
      if (role === "REGULAR_USER") {
        const digits = (phoneLocal || "").replace(/\D/g, "").slice(0, 10);
        const fullPhone = digits ? `+91${digits}` : "";
        Object.assign(payload, { firstName, lastName, email, phoneNo: fullPhone });
      } else if (role === "SPACE_OWNER") {
        Object.assign(payload, { spaceName, location: mapQuery });
      }
      await register(payload);
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
          <Select
            value={role}
            onChange={setRole}
            options={[
              { label: "Regular User", value: "REGULAR_USER" },
              { label: "Space Owner", value: "SPACE_OWNER" },
            ]}
          />
        </label>

        {role === "REGULAR_USER" && (
          <div className="card-surface" style={{ padding: 16, marginTop: 12, display: "grid", gap: 10 }}>
            <h4 className="title" style={{ fontSize: "1rem" }}>Your details</h4>
            <label style={{ display: "grid", gap: 6 }}>
              First name
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              Last name
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              Email
              <input type="email" placeholder="abc@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              Phone number
              <div className="phone-input-group">
                <span className="phone-prefix">+91</span>
                <input
                  className="phone-input"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="XXXXXXXXXX"
                  maxLength={10}
                  value={phoneLocal}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setPhoneLocal(digits);
                  }}
                />
              </div>
            </label>
          </div>
        )}

        {role === "SPACE_OWNER" && (
          <div className="card-surface" style={{ padding: 16, marginTop: 12, display: "grid", gap: 10 }}>
            <h4 className="title" style={{ fontSize: "1rem" }}>Space details</h4>
            <label style={{ display: "grid", gap: 6 }}>
              Space name
              <input placeholder="e.g., Tangerine Arts Studio, Bandra West" value={spaceName} onChange={(e) => setSpaceName(e.target.value)} required />
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              Google Maps Location
              <input placeholder="e.g., https://maps.app.goo.gl/4AcKqNPdkwCnfVcq8" value={mapQuery} onChange={(e) => setMapQuery(e.target.value)} />
            </label>
            {mapQuery ? (
              <div style={{ marginTop: 8 }}>
                <iframe
                  title="map-preview"
                  width="100%"
                  height="240"
                  style={{ border: 0, borderRadius: 12 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                />
              </div>
            ) : null}
          </div>
        )}
        <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>
    </div>
  );
}


