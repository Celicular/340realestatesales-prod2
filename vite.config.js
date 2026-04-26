import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api-internal': {
        target: 'https://340realestate.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-internal/, ''),
      },
      '/api-mls': {
        target: 'https://api.340realestate.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-mls/, ''),
      },
    },
  },
})
