import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5175,
    proxy: {
      '^/articulos/api/.*': {
        target: 'http://localhost/articulos/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/articulos\/api/, ""),
      },
    },
  },
  plugins: [react(), tailwindcss()],
})
