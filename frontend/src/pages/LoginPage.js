// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ phone, password }),
      });
      localStorage.setItem("userId", res.userId);
      localStorage.setItem("phone", res.phone || "");
      localStorage.setItem("name", res.name || "");
      nav("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api("/auth/guest-login", {
        method: "POST",
        body: JSON.stringify({ phone: guestPhone }),
      });
      localStorage.setItem("userId", res.userId);
      localStorage.setItem("phone", res.phone || "");
      localStorage.setItem("name", res.name || "");
      nav("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fullscreen-center">
      <div className="card" style={{ width: "100%", maxWidth: 380 }}>
        <div className="center">
          <img src="/assets/tailorlogo.jpg" alt="Signature Seams" className="logo" />
          <h2 style={{ margin: "4px 0 2px" }}>ShivaRudra Custom Clothiers</h2>
          <div className="small">Custom tailoring & ready-made clothing</div>
        </div>

        <h3 style={{ marginTop: 16 }}>Login</h3>
        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#b91c1c",
              padding: 8,
              borderRadius: 8,
              fontSize: 12,
              marginBottom: 8,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 10 }}>
            <label>
              Phone Number <span>*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>
              Password <span>*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="button" style={{ width: "100%" }}>
            Login
          </button>
        </form>

        <div className="small center" style={{ margin: "10px 0" }}>
          or
        </div>

        <form onSubmit={handleGuestLogin}>
          <div style={{ marginBottom: 10 }}>
            <label>Guest Login (Phone only)</label>
            <input
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          <button type="submit" className="button secondary" style={{ width: "100%" }}>
            Continue as Guest
          </button>
        </form>

        <div className="small center" style={{ marginTop: 12 }}>
          New to ShivaRudra Custom Clothiers?{" "}
          <Link to="/register" style={{ fontWeight: 600 }}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
