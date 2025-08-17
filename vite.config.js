import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": { target: "http://192.168.0.107:3000", changeOrigin: true },
    },
    hmr: {
      protocol: "ws",
      host: "localhost",
      clientPort: 5173,
    },
  },
});
