import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from "vitest/config";  // ← cambia 'vite' por 'vitest/config'
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts"
  },
  base: "/afiQA/",
});