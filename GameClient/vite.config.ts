import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    https: {
      key: fs.readFileSync('./app/ssl/server.key'),
      cert: fs.readFileSync('./app/ssl/server.crt')
    }
  }
})
