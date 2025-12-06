import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccess(){
  function backToHome(){ window.location.href = "/home"; }
  return (
    <div className="container">
      <div className="card center">
        <h2>Thanks for shopping!</h2>
        <p className="small">Your order was received and payment simulated.</p>
        <div style={{marginTop:10}}>
          <Link to="/home" style={{textDecoration:"none"}}><div className="button">Back to Home</div></Link>
        </div>
      </div>
    </div>
  );
}
