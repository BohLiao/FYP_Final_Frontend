export const simulateKyberAesEncrypt = (plaintext) => {
  try {
    const cryptoObj = window.crypto || self.crypto;
    if (!cryptoObj || !cryptoObj.getRandomValues) throw new Error("Crypto API not available");

    const fakeIV = Array.from(cryptoObj.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Encode to base64 safely
    const base64 = btoa(unescape(encodeURIComponent(plaintext)));
    return `🔒[${fakeIV}]${base64}`;
  } catch (err) {
    console.error("Encryption simulation error:", err);
    return `[ENCRYPTION FAILED] ${plaintext}`;
  }
};

export const simulateKyberAesDecrypt = (ciphertext) => {
  try {
    const match = ciphertext.match(/^🔒\[[a-fA-F0-9]{32}\](.+)$/);
    if (!match) return null;

    const base64 = match[1];
    return decodeURIComponent(escape(atob(base64)));
  } catch (err) {
    console.error("Decryption error:", err);
    return "[Decryption Failed]";
  }
};

export const isEncrypted = (msg) => msg?.startsWith("🔒[");
