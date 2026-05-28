import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
   build: {
    outDir: '../api/dist',
    emptyOutDir: true
   },
   server: {
    proxy:{
    '/api/auth': 'http://localhost:5000',
      '/api/test': 'http://localhost:5000',
      '/api/result': 'http://localhost:5000',    }
  }
})