import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any request starting with /api gets forwarded to Flask
      '/api': 'http://localhost:5000'
    }
  }
})
