import React, { useState } from "react";
import "../Test2.css";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// 🔐 Simulated AES Decryption (replace with real decryption only if possible server-side)
const mockDecrypt = (ciphertext, key) => {
  try {
    // Simple mock decryption: reverse base64 and check if the key matches
    const decoded = atob(ciphertext);
    if (decoded.includes(key)) return decoded; // Fake success condition
  } catch (e) {}
  return null;
};

const Test2 = () => {
  const [encrypted, setEncrypted] = useState("U3RyaW5nRW5jb2RlZEtleQ=="); // base64 of "StringEncodedKey"
  const [maxLen, setMaxLen] = useState(4);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const bruteForce = async () => {
    setIsRunning(true);
    setResult(null);
    const startTime = performance.now();
    const maxAttempts = Math.pow(chars.length, maxLen);
    let attempts = 0;
    let found = "";

    const generateKey = (index) => {
      let key = "";
      for (let i = 0; i < maxLen; i++) {
        key = chars[index % chars.length] + key;
        index = Math.floor(index / chars.length);
      }
      return key.padStart(maxLen, chars[0]);
    };

    while (attempts < maxAttempts) {
      const guess = generateKey(attempts);
      const decrypted = mockDecrypt(encrypted, guess);
      if (decrypted) {
        found = guess;
        break;
      }
      attempts++;
      if (attempts % 50000 === 0) {
        const time = (performance.now() - startTime) / 1000;
        console.log(`Tried ${attempts} in ${time.toFixed(2)}s`);
      }
    }

    const endTime = performance.now();
    setResult({
      found,
      attempts,
      time: (endTime - startTime).toFixed(2),
      success: found !== "",
    });
    setIsRunning(false);
  };

  return (
    <div className="test2-wrapper">
      <h1>🧠 AES Brute Force Simulator</h1>

      <div className="test2-form">
        <label>Encrypted String (Base64):</label>
        <input
          type="text"
          value={encrypted}
          onChange={(e) => setEncrypted(e.target.value)}
        />

        <label>Key Length:</label>
        <input
          type="number"
          min={1}
          max={8}
          value={maxLen}
          onChange={(e) => setMaxLen(Number(e.target.value))}
        />

        <button onClick={bruteForce} disabled={isRunning}>
          {isRunning ? "Brute-forcing..." : "Start Attack"}
        </button>
      </div>

      {result && (
        <div className="test2-results">
          <p><strong>Guessed Key:</strong> {result.found || "N/A"}</p>
          <p><strong>Attempts:</strong> {result.attempts.toLocaleString()}</p>
          <p><strong>Time:</strong> {result.time} ms</p>
          <p><strong>Status:</strong> {result.success ? "✅ Success" : "❌ Failed"}</p>
        </div>
      )}
    </div>
  );
};

export default Test2;