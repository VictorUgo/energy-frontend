import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  build: {
    chunkSizeWarningLimit: 1600
  },
  server: {
    open: true,
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'https://vvh.life/', // Tu backend en EC2
        changeOrigin: true,
        secure: false, // importante para evitar errores con certificados no válidos
        rewrite: (path) => path.replace(/^\/api/, '/api') // mantiene el path
      }
    }
  },
  preview: {
    open: true,
    host: true
  },
  base: '/',
  define: {
    global: 'window'
  }
});
