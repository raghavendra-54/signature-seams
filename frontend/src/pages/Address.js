import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Address(){
  const [form,setForm] = useState({name:"",phone:"",line1:"",line2:"",city:"",state:"",pincode:""});
  const nav = useNavigate();
  const userId = localStorage.getItem("userId");

  const onChange=(k,v)=> setForm({...form,[k]:v});

  const saveAddress = async ()=>{
    if(!userId) return alert("Login first");
    const res = await fetch("/api/address", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({...form, userId: Number(userId)})
    });
    const data = await res.json();
    if(data && data.id){
      alert("Address saved");
      nav('/home');
    } else alert("Save failed");
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:720, margin:"0 auto"}}>
        <h2>Delivery Address</h2>
        <div className="form-row"><input className="input" placeholder="Full name" value={form.name} onChange={e=>onChange('name',e.target.value)} /></div>
        <div className="form-row"><input className="input" placeholder="Phone" value={form.phone} onChange={e=>onChange('phone',e.target.value)} /></div>
        <div className="form-row"><input className="input" placeholder="Address line 1" value={form.line1} onChange={e=>onChange('line1',e.target.value)} /></div>
        <div className="form-row"><input className="input" placeholder="Address line 2" value={form.line2} onChange={e=>onChange('line2',e.target.value)} /></div>
        <div style={{display:"flex", gap:8}}>
          <input className="input" placeholder="City" value={form.city} onChange={e=>onChange('city',e.target.value)} />
          <input className="input" placeholder="State" value={form.state} onChange={e=>onChange('state',e.target.value)} />
          <input className="input" placeholder="Pincode" value={form.pincode} onChange={e=>onChange('pincode',e.target.value)} />
        </div>
        <div style={{textAlign:"center", marginTop:12}}>
          <button className="button" onClick={saveAddress}>Save Address</button>
        </div>
      </div>
    </div>
  );
}
