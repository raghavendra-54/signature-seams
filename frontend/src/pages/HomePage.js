// src/pages/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const nav = useNavigate();
  const name = localStorage.getItem("name") || "Guest";

  const handleLogout = () => {
    localStorage.clear();
    nav("/login");
  };

  return (
    <div className="container">
      <div className="topbar">
        <div>
          <div className="small">Welcome, {name}</div>
          <div className="topbar-title">ShivaRudra Custom Clothiers</div>
        </div>
        <button className="button secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="card">
        <h3>What would you like to shop?</h3>
        <div className="grid grid-2" style={{ marginTop: 12 }}>
          <div className="card" style={{ padding: 14 }}>
            <img
              src="/assets/Custom-tailoring-1.jpeg"
              alt="Custom tailoring"
              style={{ width: "100%", borderRadius: 10, marginBottom: 8, objectFit: "cover" }}
            />
            <h4>Custom Tailoring</h4>
            <div className="small">
              Choose fabric, give measurements and get your perfect shirt.
            </div>
            <button
              className="button"
              style={{ marginTop: 10, width: "100%" }}
              onClick={() => nav("/products")}
            >
              Browse Materials
            </button>
          </div>

          <div className="card" style={{ padding: 14 }}>
            <img
              src="/assets/ready-made.jpg"
              alt="Ready-made"
              style={{ width: "100%", borderRadius: 10, marginBottom: 8, objectFit: "cover" }}
            />
            <h4>Ready-made</h4>
            <div className="small">
              Coming soon: ready-made shirts & pants with instant delivery.
            </div>
            <button className="button secondary" style={{ marginTop: 10, width: "100%" }} disabled>
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
