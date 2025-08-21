import React from "react";
import { Link } from "react-router-dom";
import Hero from "./components/Hero";

export default function About() {
  return (
    <div className="container">
      <Hero title="ChoreoHub" subtitle="Find your next class or fill your studio faster." />

      {/* Hero badges */}
      <div className="animate-in" style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "8px 0 18px" }}>
        <span style={{ border: "1px solid rgba(245,158,11,0.35)", background: "rgba(245,158,11,0.08)", color: "#f59e0b", padding: "6px 10px", borderRadius: 9999, fontWeight: 700, fontSize: 12 }}>For Dancers</span>
        <span style={{ border: "1px solid rgba(59,130,246,0.35)", background: "rgba(59,130,246,0.12)", color: "#93c5fd", padding: "6px 10px", borderRadius: 9999, fontWeight: 700, fontSize: 12 }}>For Space Owners</span>
        <span style={{ border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)", color: "#e5e7eb", padding: "6px 10px", borderRadius: 9999, fontWeight: 700, fontSize: 12 }}>Mobile Friendly</span>
      </div>

      <section className="card-surface animate-in" style={{ padding: 20, marginBottom: 16 }}>
        <h2 className="title">Why ChoreoHub?</h2>
        <p className="info">
          ChoreoHub connects dancers and studios in one clean, fast experience. Discover amazing
          workshops, compare spaces, and register in a few taps — or publish your event and reach
          more dancers today.
        </p>
      </section>

      {/* Two-up feature grid */}
      <div className="animate-in" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 16 }}>
        <section className="card-surface hoverable" style={{ padding: 20 }}>
          <h3 className="title">✨ For Dancers (Users)</h3>
          <ul className="info" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Browse curated workshops across studios — all in one place.</li>
            <li>Powerful filters: category, level, space and date range.</li>
            <li>One‑tap directions and Instagram previews to vibe‑check classes.</li>
            <li>Profile and bookings in a clean, distraction‑free view.</li>
            <li>Fast on mobile, gorgeous on desktop.</li>
          </ul>
        </section>
        <section className="card-surface hoverable" style={{ padding: 20 }}>
          <h3 className="title">🏢 For Space Owners</h3>
          <ul className="info" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Create a workshop in seconds — title, date, level, category, space.</li>
            <li>Keep registrations and requests organized with clear views.</li>
            <li>Showcase your space with rich thumbnails that pop.</li>
            <li>Role‑based access: publish/manage when signed in as Space Owner.</li>
            <li>Designed to help you fill slots and grow your community.</li>
          </ul>
        </section>
      </div>

      {/* Visual highlights */}
      <section className="card-surface animate-in" style={{ padding: 20, marginBottom: 16 }}>
        <h3 className="title">Built for Speed and Clarity</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          <div className="card-surface" style={{ padding: 16 }}>
            <div className="badge" style={{ display: "inline-block", marginBottom: 8 }}>⚡</div>
            <p className="info" style={{ margin: 0 }}>Lightning‑fast loading with smooth, minimal UI.</p>
          </div>
          <div className="card-surface" style={{ padding: 16 }}>
            <div className="badge" style={{ display: "inline-block", marginBottom: 8 }}>🌓</div>
            <p className="info" style={{ margin: 0 }}>Dark/Light themes for comfy browsing anywhere.</p>
          </div>
          <div className="card-surface" style={{ padding: 16 }}>
            <div className="badge" style={{ display: "inline-block", marginBottom: 8 }}>♿</div>
            <p className="info" style={{ margin: 0 }}>Accessible controls and keyboard‑friendly flows.</p>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="card-surface animate-in" style={{ padding: 24, textAlign: "center", background: "linear-gradient(180deg, rgba(59,130,246,0.12), rgba(245,158,11,0.12))", border: "1px solid rgba(255,255,255,0.12)" }}>
        <h3 className="title">Ready to dance?</h3>
        <p className="info" style={{ marginBottom: 14 }}>
          Join now to book workshops or publish your next event.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn ghost">Create an account</Link>
        </div>
      </section>
    </div>
  );
}


