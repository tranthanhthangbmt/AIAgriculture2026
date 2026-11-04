import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/AIAgriculture2026/web_ai_nongnghiep/public/',
  publicDir: false,
})
