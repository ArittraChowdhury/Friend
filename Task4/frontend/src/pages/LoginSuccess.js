import React from "react";
import { Link } from "react-router-dom";

export default function LoginSuccess() {
  return (
    <div className="login-success-container" style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>✅ Login Successful!</h2>
      <p>Welcome back! You have successfully logged in.</p>
      <Link to="/login" style={{ marginTop: "20px", display: "inline-block" }}>
        🔁 Go back to Login Page
      </Link>
    </div>
  );
}
