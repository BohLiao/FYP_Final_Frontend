import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  preview: {
    port: 4173,
    host: true,
    allowedHosts: ["fyp-final-frontend.onrender.com"],
  },
});
