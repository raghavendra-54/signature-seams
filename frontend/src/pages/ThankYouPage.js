// src/pages/ThankYouPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYouPage() {
  const nav = useNavigate();

  const handleBackHome = () => {
    nav("/");
  };

  return (
    <div className="fullscreen-center">
      <div className="card" style={{ maxWidth: 380, textAlign: "center" }}>
        <h2>Thank you!</h2>
        <p className="small">
          Your order has been placed with <b>Cash on Delivery</b>. Our team will contact you soon for
          confirmation.
        </p>
        <button
          className="button"
          style={{ marginTop: 12, width: "100%" }}
          onClick={handleBackHome}
        >
          Back to Home
        </button>

        {/* 🔽 New block: contact developer */}
        <div style={{ marginTop: 16, textAlign: "left" }}>
          <div className="small" style={{ fontWeight: 600, marginBottom: 4 }}>
            Contact developer of this ShivaRudra Custom Clothiers App:
          </div>
          <div className="small">
            Name:{" "}
            <a href="https://gattu-raghavendra.github.io">
              RAGHAVENDRA GATTU
            </a>
            <br />

            Email:{" "}
            <a href="mailto:gatturaghava.edu123@gmail.com">
              gatturaghava.edu123@gmail.com
            </a>
            <br />

            Portfolio:{" "}
            <a href="https://gattu-raghavendra.github.io">
              https://gattu-raghavendra.github.io
            </a>
            <br />

            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/raghavendra-gattu/"
              target="_blank"
              rel="noreferrer"
            >
              https://www.linkedin.com/in/raghavendra-gattu/
            </a>
            <br />
            GitHub:{" "}
            <a
              href="https://github.com/gattu-raghavendra"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/gattu-raghavendra
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
