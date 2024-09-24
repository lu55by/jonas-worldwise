import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: true, // Open to local network and display URL
    port: 5514, // Customize the port number
  },
});
