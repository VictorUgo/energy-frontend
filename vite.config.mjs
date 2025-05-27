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
    host: true
  },
  preview: {
    open: true,
    host: true
  },
  base: '/free/', // <- MUY IMPORTANTE
  define: {
    global: 'window'
  }
});
