import { defineConfig } from 'vite';

export default defineConfig({
  base: './', 
  build: {
    outDir: 'dist', 
    rollupOptions: {
      input: {
        main: 'index.html',
        dashboard: 'dashboard.html',
      }
    }
  },
});