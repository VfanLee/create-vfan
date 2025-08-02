import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://cn.vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
