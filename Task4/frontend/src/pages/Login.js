import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import "./Login.css";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/"); // Redirect to landing page
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <div className="logo">THE APP</div>
        <div className="login-title">Sign In to The App</div>
        {msg && <div className="alert alert-danger">{msg}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>E-mail</label>
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
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
          <div className="form-links">
            <small>
              Don’t have an account? <Link to="/register">Sign up</Link>
            </small>
            <small>
              <Link to="#">Forgot password?</Link>
            </small>
          </div>
        </form>
      </div>
      <div className="right-panel"></div>
    </div>
  );
}
