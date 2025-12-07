// src/pages/MeasurementsPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function MeasurementsPage() {
  const nav = useNavigate();
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    chest: "",
    shoulder: "",
    sleeves: "",
    length: "",
    waist: "",
    neck: "",
    hip: "",
    bicep: "",
    wrist: "",
    abdomen: "",
    thigh: "",
    knee: "",
    bottom: "",
    extraNotes: "",
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Only fields matching Measurement entity will be saved; others will be ignored by backend.
    try {
      const body = {
        user: { id: Number(userId) },
        chest: form.chest,
        shoulder: form.shoulder,
        sleeves: form.sleeves,
        length: form.length,
        waist: form.waist,
      };
      const saved = await api("/measurements", {
        method: "POST",
        body: JSON.stringify(body),
      });
      localStorage.setItem("measurementId", saved.id);
      nav("/payment");
    } catch (err) {
      alert("Failed to save measurements: " + err.message);
    }
  };

  const handleMeasureMeAI = () => {
  window.open(
    "https://6935134d680ce169e6afb2a2--thunderous-syrniki-91da07.netlify.app",
    "_blank",
    "noopener,noreferrer"
  );
};

  return (
    <div className="container">
      <div className="topbar">
        <div className="topbar-title">Custom Measurements</div>
        <button className="button secondary" onClick={() => nav(-1)}>
          Back
        </button>
      </div>

      <div className="card">
        <img
          src="/assets/measurementschart.png"
          alt="Measurements"
          style={{
            width: "100%",
            borderRadius: 10,
            marginBottom: 8,
            objectFit: "cover",
            aspectRatio: "16 / 9",
          }}
        />
        <p className="small">
          For best fit, measure over a light shirt. If you are not sure, you can use{" "}
          <span style={{ fontWeight: 600 }}>MeasureMe AI</span>.
        </p>
        <button
          className="button secondary"
          style={{ marginTop: 8, marginBottom: 12 }}
          onClick={handleMeasureMeAI}
        >
          MeasureMe AI
        </button>

        <form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
          {/* Show important 14 measurement fields */}
          <div className="grid" style={{ gap: 8 }}>
            <Input label="Chest" name="chest" value={form.chest} onChange={handleChange} />
            <Input label="Shoulder" name="shoulder" value={form.shoulder} onChange={handleChange} />
            <Input label="Sleeves" name="sleeves" value={form.sleeves} onChange={handleChange} />
            <Input label="Shirt Length" name="length" value={form.length} onChange={handleChange} />
            <Input label="Waist" name="waist" value={form.waist} onChange={handleChange} />
            <Input label="Neck" name="neck" value={form.neck} onChange={handleChange} />
            <Input label="Hip" name="hip" value={form.hip} onChange={handleChange} />
            <Input label="Bicep" name="bicep" value={form.bicep} onChange={handleChange} />
            <Input label="Wrist" name="wrist" value={form.wrist} onChange={handleChange} />
            <Input
              label="Abdomen"
              name="abdomen"
              value={form.abdomen}
              onChange={handleChange}
            />
            <Input label="Thigh" name="thigh" value={form.thigh} onChange={handleChange} />
            <Input label="Knee" name="knee" value={form.knee} onChange={handleChange} />
            <Input label="Bottom" name="bottom" value={form.bottom} onChange={handleChange} />
          </div>

          <div style={{ marginTop: 10 }}>
            <label>Model / Style description</label>
            <textarea
              name="extraNotes"
              value={form.extraNotes}
              onChange={handleChange}
              rows={3}
              placeholder="Eg: Slim fit, curved bottom, two pockets..."
            />
          </div>

          <button type="submit" className="button" style={{ width: "100%", marginTop: 12 }}>
            Save & Payment
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input name={name} value={value} onChange={onChange} />
    </div>
  );
}
