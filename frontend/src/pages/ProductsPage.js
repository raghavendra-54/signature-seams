// src/pages/ProductsPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await api("/products");
        setProducts(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="topbar">
        <div className="topbar-title">Custom Tailoring – Materials</div>
        <button className="button secondary" onClick={() => nav("/")}>
          Home
        </button>
      </div>

      <div className="grid grid-2">
        {products.map((p) => (
          <div key={p.id} className="card" style={{ padding: 14 }}>
            <img
              src={p.imageRaw}
              alt={p.title}
              style={{
                width: "100%",
                borderRadius: 10,
                marginBottom: 8,
                objectFit: "cover",
                aspectRatio: "3 / 4",
              }}
            />
            <h4>{p.title}</h4>
            <div className="small">{p.description}</div>
            <div style={{ marginTop: 6, fontWeight: 600 }}>₹ {p.price}</div>
            <button
              className="button"
              style={{ marginTop: 10, width: "100%" }}
              onClick={() => nav(`/products/${p.id}`)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
