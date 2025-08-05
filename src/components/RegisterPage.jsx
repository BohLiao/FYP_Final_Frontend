import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { simulateKyberAesEncrypt } from "../crypto/kyber_aes";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^\d{8}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const encryptedUsername = simulateKyberAesEncrypt(username);
      const encryptedPhone = simulateKyberAesEncrypt(phone);
      const encryptedEmail = simulateKyberAesEncrypt(email);
      const encryptedPassword = simulateKyberAesEncrypt(password);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: encryptedUsername,
          phone: encryptedPhone,
          email: encryptedEmail,
          password: encryptedPassword,
        }),
      });

      if (!res.ok) throw new Error("Registration failed");

      await res.json();
      alert("Registered successfully! You can now log in.");
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create an Account</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleRegister}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {phone && phone.length !== 8 && (
            <div
              style={{
                fontSize: "0.75rem",
                color: "#b14e4e",
                marginBottom: "1rem",
                marginTop: "-0.75rem",
              }}
            >
              Invalid phone number
            </div>
          )}

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <button type="submit">Register</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
