import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>Login</h3>
      {msg && <div className="alert alert-danger">{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="form-control mb-2" placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}