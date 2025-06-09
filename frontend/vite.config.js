// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    // Enforce case-sensitive paths for Linux (Vercel)
    preserveSymlinks: false,
    caseSensitive: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
