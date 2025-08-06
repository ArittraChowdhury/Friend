import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import "./Register.css";
import { FaEnvelope, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="logo">THE APP</div>
        <div className="register-title">Create a New Account</div>
        {msg && <div className="alert alert-danger">{msg}</div>}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <div className="input-group">
              <input
                type="text"
                placeholder="John Doe"
                className="form-control"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <span className="input-group-text">
                <FaUser />
              </span>
            </div>
          </div>
          <div className="mb-3">
            <label>Email</label>
            <div className="input-group">
              <input
                type="email"
                placeholder="test@example.com"
                className="form-control"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <span className="input-group-text">
                <FaEnvelope />
              </span>
            </div>
          </div>
          <div className="mb-3">
            <label>Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="form-control"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
          <div className="text-center mt-3">
            <small>
              Already have an account? <Link to="/login">Sign in</Link>
            </small>
          </div>
        </form>
      </div>
      <div className="register-right"></div>
    </div>
  );
}
