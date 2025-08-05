import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { simulateKyberAesDecrypt } from "../crypto/kyber_aes"; // ⬅️ Make sure this path is correct

export default function OTPPage({ pendingUser, setAuth, setPendingUser }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const decryptedUsername = simulateKyberAesDecrypt(pendingUser); // ⬅️ Decrypt username

  if (!pendingUser) {
    return (
      <div className="otp-container">
        <div className="otp-card">
          <h2 style={{ fontSize: "1.3rem" }}>No username provided</h2>
          <p>Please register or login first</p>
          <button onClick={() => navigate("/login")} className="back-button">
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: pendingUser, otp: otp.trim() }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "OTP verification failed");
      }

      alert("OTP verified! Welcome to Quantum Chat.");
      setAuth({ user: { username: decryptedUsername } });
      setPendingUser(null);
      navigate("/chat");
    } catch (err) {
      setError(err.message);
      setOtp("");
      console.error("OTP verification error:", err);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError(null);
    setInfo(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: pendingUser }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to resend OTP");
      }

      const data = await res.json();
      setInfo(`OTP resent: ${data.otp}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2 style={{ fontSize: "1.3rem" }}>
          Enter OTP for 🔒 {decryptedUsername}
        </h2>

        {error && <div className="error-message">{error}</div>}
        {info && <div className="info-message">{info}</div>}

        <form onSubmit={handleVerify}>
          <input
            autoFocus
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit" disabled={resending}>
            Verify OTP
          </button>
        </form>

        <button
          onClick={handleResend}
          disabled={resending}
          style={{ marginTop: "1rem" }}
        >
          {resending ? "Resending OTP..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}
