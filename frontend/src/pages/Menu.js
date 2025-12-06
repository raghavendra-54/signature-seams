import React from "react";
import { Link } from "react-router-dom";

export default function Menu(){
  return (
    <div className="container">
      <div className="card">
        <h3>Menu</h3>
        <div className="row" style={{flexDirection:"column", gap:8}}>
          <Link to="/home"><div className="button secondary">Home</div></Link>
          <Link to="/products"><div className="button">Custom Tailoring</div></Link>
          <Link to="/measurements"><div className="button">Measurements</div></Link>
        </div>
      </div>
    </div>
  );
}
