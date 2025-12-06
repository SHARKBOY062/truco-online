import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'public/dist', // build vai para /public/dist dentro do release
    emptyOutDir: true,     // limpa o dist antigo dentro de public
  },
})
