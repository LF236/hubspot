import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Esto es crucial para que los assets se sirvan correctamente desde Nest
  build: {
    outDir: 'dist', // Puedes cambiar esto si quieres que el build se genere en otra carpeta
  },
});