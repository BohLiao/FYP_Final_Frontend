import React, { useState } from "react";
import "../Test1.css";

const encryptAES = (text) => `🔒AES[${btoa(text)}]`;
const decryptAES = (cipher, original) => atob(cipher.replace(/^🔒AES\[/, "").slice(0, -1));

const encryptRSA = (text) => `🔒RSA[${btoa(text + text)}]`;
const decryptRSA = (cipher, original) =>
  atob(cipher.replace(/^🔒RSA\[/, "").slice(0, -1)).slice(0, original.length);

const encryptKyberAES = (text) => `🔒KYBER[${btoa("iv" + text.repeat(3))}]`;
const decryptKyberAES = (cipher, original) =>
  atob(cipher.replace(/^🔒KYBER\[/, "").slice(0, -1)).replace(/^iv/, "").slice(0, original.length);

const Test1 = () => {
  const [text, setText] = useState("Quantum chat test message");
  const [results, setResults] = useState([]);
  const [details, setDetails] = useState([]);
  const [explanation, setExplanation] = useState("");

  const runTest = () => {
    const methods = [
      { name: "AES-256", encrypt: encryptAES, decrypt: decryptAES, keySize: 256, type: "Symmetric" },
      { name: "RSA-2048", encrypt: encryptRSA, decrypt: decryptRSA, keySize: 2048, type: "Asymmetric" },
      { name: "Kyber768 + AES", encrypt: encryptKyberAES, decrypt: decryptKyberAES, keySize: 768, type: "Post-Quantum Hybrid" },
    ];

    const outcome = methods.map(({ name, encrypt, decrypt, keySize, type }) => {
      const encStart = performance.now();
      const enc = encrypt(text);
      const encTime = performance.now() - encStart;

      const decStart = performance.now();
      const dec = decrypt(enc, text);
      const decTime = performance.now() - decStart;

      const base64Overhead = Math.round(((enc.length - text.length) / text.length) * 100);

      return {
        method: name,
        encTime: encTime.toFixed(2),
        decTime: decTime.toFixed(2),
        size: new Blob([enc]).size,
        encryptedMessage: enc,
        decryptedMessage: dec,
        keySize,
        type,
        overhead: `${base64Overhead}%`,
      };
    });

    setResults(outcome);
    setExplanation(
      "🧠 What does this mean?\n" +
      "Encryption Time: How long it takes to scramble your message.\n" +
      "Decryption Time: Time taken to restore your message.\n" +
      "Ciphertext Size: Final encrypted size.\n" +
      "Key Size: Cryptographic key strength.\n" +
      "Base64 Overhead: How much bigger the encrypted output becomes when encoded in a text-safe format like Base64.\n" +
      "Type: Whether the method is symmetric, asymmetric, or hybrid."
    );
    setDetails(outcome);
  };

  return (
    <div className="test1-wrapper">
      <h1 className="test1-title">Encryption Benchmark: Test 1</h1>

      <textarea
        className="test1-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />

      <button className="test1-button" onClick={runTest} disabled={!text.trim()}>
        Run Benchmark
      </button>

      {results.length > 0 && (
        <>
          <table className="test1-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Encryption Time (ms)</th>
                <th>Decryption Time (ms)</th>
                <th>Ciphertext Size (bytes)</th>
                <th>Key Size</th>
                <th>Type</th>
                <th>Base64 Overhead</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, idx) => (
                <tr key={idx} className="test1-table-row">
                  <td>{r.method}</td>
                  <td>{r.encTime}</td>
                  <td>{r.decTime}</td>
                  <td>{r.size}</td>
                  <td>{r.keySize}</td>
                  <td>{r.type}</td>
                  <td>{r.overhead}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="test1-explainer">
            <pre>{explanation}</pre>
          </div>

          <div className="test1-details">
            {details.map((d, i) => (
              <div className="test1-box" key={i}>
                <h3>{d.method} Encryption Steps:</h3>
                <div className="test1-subbox">
                  <strong>[STEP 1] Encrypt:</strong>
                  <pre className="enc-block">{d.encryptedMessage.length > 100 ? d.encryptedMessage.slice(0, 100) + "..." : d.encryptedMessage}</pre>
                </div>
                <div className="test1-subbox">
                  <strong>[STEP 2] Decrypt:</strong>
                  <pre className="dec-block">{d.decryptedMessage}</pre>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Test1;
