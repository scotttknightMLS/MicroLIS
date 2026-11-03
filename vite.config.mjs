import { defineConfig } from 'vite';

export default defineConfig({
  root: 'app',
  base: '/MicroLIS/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsDir: 'site-assets',
  },
});
