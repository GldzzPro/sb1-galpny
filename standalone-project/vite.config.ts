import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path"; // Correct way to import path in TypeScript

export default defineConfig({
  plugins: [react({ jsxRuntime: "classic" })],
  build: {
    lib: {
      entry: path.resolve(path.dirname(""), "src/main.tsx"), // Use path.dirname() if __dirname is not available
      name: "MyComponent",
      fileName: (format) => `my-component.${format}.js`,
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
