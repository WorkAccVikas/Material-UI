import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, // Specify the port number
    proxy: {
      "/api": "https://billing.mydigitick.com",
    },
  },
  plugins: [react()],
});
