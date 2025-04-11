import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),    
  ],
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "web-vitals"],
        },
      },
    }
  }
})
