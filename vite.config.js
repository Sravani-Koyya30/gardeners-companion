import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/gardeners-companion/',
  plugins: [react()],
})
