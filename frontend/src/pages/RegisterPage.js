// src/pages/RegisterPage.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, phone, password }),
      });
      nav("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fullscreen-center">
      <div className="card" style={{ width: "100%", maxWidth: 380 }}>
        <div className="center">
          <img src="/asset/logo.png" alt="Signature Seams" className="logo" />
          <h2>Register</h2>
        </div>

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

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: 10 }}>
            <label>
              Name <span>*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

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
              placeholder="Create password"
            />
          </div>

          <button type="submit" className="button" style={{ width: "100%" }}>
            Create Account
          </button>
        </form>

        <div className="small center" style={{ marginTop: 12 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ fontWeight: 600 }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
