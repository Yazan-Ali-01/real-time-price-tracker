/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global test methods like `describe` and `it`
    environment: "jsdom", // JSDOM environment to simulate browser behavior
    setupFiles: "./src/setupTests.ts", // File to configure global test setup
    css: true, // Enables CSS handling in tests (optional)
    coverage: {
      reporter: ["text", "html"], // Outputs both console and HTML reports
    },
  },
});
