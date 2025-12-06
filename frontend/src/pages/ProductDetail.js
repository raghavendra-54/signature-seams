// src/pages/ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await api(`/products/${id}`);
        setProduct(data);
        localStorage.setItem("selectedProductId", data.id);
        localStorage.setItem("selectedProductPrice", data.price);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  if (!product) {
    return (
      <div className="container">
        <div className="card">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="topbar-title">{product.title}</div>
        <button className="button secondary" onClick={() => nav("/products")}>
          Back
        </button>
      </div>

      <div className="card">
        <div className="product-images">
          <div className="img-box">
            <img src={product.imageRaw} alt="Before tailoring" />
            <div className="small center">Before Tailoring</div>
          </div>
          <div className="img-box">
            <img src={product.imageTailored} alt="After tailoring" />
            <div className="small center">After Tailoring (preview)</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <h3>{product.title}</h3>
        <div className="small">{product.description}</div>
        <div style={{ marginTop: 6, fontWeight: 700, fontSize: 18 }}>₹ {product.price}</div>
        <button
          className="button"
          style={{ marginTop: 12 }}
          onClick={() => nav("/measurements")}
        >
          Measurements
        </button>
      </div>
    </div>
  );
}
