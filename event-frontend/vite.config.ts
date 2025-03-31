import tailwindcss      from "@tailwindcss/vite";
import react            from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins     : [react(), tailwindcss()],
  optimizeDeps: {
    include: [
      "@mui/x-date-pickers",
      "@mui/x-date-pickers/AdapterDayjs",
      "@mui/x-date-pickers/DatePicker",
      "@mui/material/TextField",
    ],
  },
});
