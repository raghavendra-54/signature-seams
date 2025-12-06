// src/pages/PaymentPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function PaymentPage() {
  const nav = useNavigate();
  const userId = localStorage.getItem("userId");
  const productId = localStorage.getItem("selectedProductId");
  const measurementId = localStorage.getItem("measurementId");
  const productPrice = localStorage.getItem("selectedProductPrice") || "0";

  const [address, setAddress] = useState({
    state: "",
    city: "",
    house: "",
    street: "",
    pincode: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setAddress((a) => ({ ...a, [e.target.name]: e.target.value }));
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // 1) Save address
      const savedAddr = await api("/addresses", {
        method: "POST",
        body: JSON.stringify({
          ...address,
          user: { id: Number(userId) },
        }),
      });

      // 2) Create order with COD
      const order = await api("/orders", {
        method: "POST",
        body: JSON.stringify({
          user: { id: Number(userId) },
          product: { id: Number(productId) },
          measurement: { id: Number(measurementId) },
          address: { id: savedAddr.id },
          amount: Number(productPrice),
        }),
      });

      // 3) Confirm COD (status)
      await api(`/orders/${order.id}/pay-cod`, { method: "POST" });

      nav("/thank-you");
    } catch (err) {
      alert("Failed to place order: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <div className="topbar">
        <div className="topbar-title">Payment & Delivery</div>
        <button className="button secondary" onClick={() => nav(-1)}>
          Back
        </button>
      </div>

      <div className="card">
        <h4>Payment Options</h4>
        <div className="payment-options">
          <div className="payment-option">
            <input type="radio" disabled />
            <span className="small">UPI (coming soon)</span>
          </div>
          <div className="payment-option">
            <input type="radio" disabled />
            <span className="small">Credit / Debit Card (coming soon)</span>
          </div>
          <div className="payment-option">
            <input type="radio" disabled />
            <span className="small">Netbanking (coming soon)</span>
          </div>
          <div className="payment-option">
            <input type="radio" checked readOnly />
            <span style={{ fontWeight: 600 }}>Cash on Delivery (COD)</span>
            <span className="chip">Available</span>
          </div>
        </div>

        <hr style={{ margin: "12px 0" }} />

        <h4>Delivery Address</h4>
        <form onSubmit={handleOrder}>
          <div style={{ marginBottom: 8 }}>
            <label>
              State <span>*</span>
            </label>
            <input
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="State"
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label>
              City / Town <span>*</span>
            </label>
            <input
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="City / Town"
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label>
              House / Flat <span>*</span>
            </label>
            <input
              name="house"
              value={address.house}
              onChange={handleChange}
              placeholder="House / Flat No."
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label>
              Street / Area <span>*</span>
            </label>
            <input
              name="street"
              value={address.street}
              onChange={handleChange}
              placeholder="Street / Area"
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label>
              Pincode <span>*</span>
            </label>
            <input
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              placeholder="Pincode"
            />
          </div>

          <div style={{ marginTop: 10, marginBottom: 8 }}>
            <div className="small">
              Order total: <span style={{ fontWeight: 700 }}>₹ {productPrice}</span>
            </div>
          </div>

          <button
            type="submit"
            className="button"
            style={{ width: "100%", marginTop: 4 }}
            disabled={saving}
          >
            {saving ? "Placing order..." : "Order (Cash on Delivery)"}
          </button>
        </form>
      </div>
    </div>
  );
}
