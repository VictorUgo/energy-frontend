// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig({
  server: {
    open: true,
    port: 3000,
    host: true
  },
  preview: {
    open: true,
    host: true
  },
  build: {
    chunkSizeWarningLimit: 1600
  },
  define: {
    global: 'window'
  },
  resolve: {
    alias: {
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs'
    }
  },
  base: '/', // ✅ Muy importante para Vercel
  plugins: [react(), jsconfigPaths()]
});
