// require('dotenv').config({ path: path.join(__dirname, '.env') })
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pkg from './package.json'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  root: path.join(__dirname, 'src/render'),
  base: './',
  server: {
    port: pkg.env.PORT,
  },
  resolve: {
    alias: {
      '@root': __dirname,
      '@': path.join(__dirname, 'src'),
    },
  },
  build: {
    outDir: path.join(__dirname, 'dist/render'),
    sourcemap: true,
    minify: false,
    rollupOptions: {
      input: {
        main: path.join(__dirname, 'src/render/index.html'),
        login: path.join(__dirname, 'src/render/login.html'),
      },
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
})
