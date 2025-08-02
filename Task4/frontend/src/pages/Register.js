import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  //const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      setMsg("Registered successfully. You can login now.");
    } catch (err) {
      setMsg(err.response?.data?.error || "Error occurred.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>Register</h3>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="form-control mb-2" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="form-control mb-2" placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}
