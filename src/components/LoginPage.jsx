import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { simulateKyberAesEncrypt } from "../crypto/kyber_aes";

const LoginPage = ({ setPendingUser, setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // 🔐 Encrypt username and password before sending
      const encryptedUsername = simulateKyberAesEncrypt(username);
      const encryptedPassword = simulateKyberAesEncrypt(password);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: encryptedUsername,
          password: encryptedPassword,
        }),
      });

      if (!res.ok) {
        setError("Invalid username or password.");
        return;
      }

      // 🔐 Also use encrypted username to trigger OTP
      const otpRes = await fetch(`${import.meta.env.VITE_API_URL}/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: encryptedUsername }),
      });

      if (!otpRes.ok) {
        const errData = await otpRes.json();
        throw new Error(errData.error || "Failed to send OTP");
      }

      const otpData = await otpRes.json();
      alert(`OTP sent: ${otpData.otp}`);

      setPendingUser(encryptedUsername); // Store encrypted name for OTP
      navigate("/otp");

    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back!</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="login-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

        <p className="login-link">
          <Link to="/">Back to Home Page</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;