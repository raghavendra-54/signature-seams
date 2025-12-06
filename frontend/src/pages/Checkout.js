import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Checkout() {
  const [method, setMethod] = useState("upi");
  const [amount, setAmount] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    const storedAmount = localStorage.getItem("lastOrderAmount");
    if (storedAmount) {
      setAmount(parseFloat(storedAmount));
    }
  }, []);

  async function handlePay() {
    const orderId = localStorage.getItem("lastOrderId");
    if (!orderId) {
      alert("No order found. Please enter measurements again.");
      return;
    }
    await api(`/api/orders/${orderId}/pay-simulate`, {
      method: "POST",
    });
    nav("/thank-you");
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Payment</h2>
        <p className="small">
          This is a simulated payment screen, similar to an e-commerce checkout.
        </p>

        <div style={{ marginTop: 12 }}>
          <div className="field-group">
            <label className="field-label">Amount</label>
            <div style={{ fontSize: 18, fontWeight: 600 }}>₹ {amount}</div>
          </div>

          <div className="field-group" style={{ marginTop: 12 }}>
            <label className="field-label">Payment method</label>
            <select
              className="field"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="upi">UPI</option>
              <option value="card">Credit / Debit Card</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <button
            className="button"
            style={{ marginTop: 16 }}
            onClick={handlePay}
          >
            Pay Now (simulate)
          </button>
        </div>
      </div>
    </div>
  );
}
