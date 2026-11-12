import {defineConfig} from 'vite';
import {resolve} from 'node:path';
export default defineConfig({
  root:'app',base:'/MicroLIS/',
  build:{outDir:'../dist',emptyOutDir:true,assetsDir:'site-assets',rollupOptions:{input:{
    home: resolve('app/index.html'),
    bloodBank: resolve('app/blood-bank/index.html'),
    microbiology: resolve('app/microbiology/index.html')
  }}}
});
