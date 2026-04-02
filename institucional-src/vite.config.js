import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/home/institucional/',
  build: {
    outDir: '../institucional',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog.html')
      }
    }
  }
});
