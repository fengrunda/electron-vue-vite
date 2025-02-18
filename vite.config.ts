// require('dotenv').config({ path: join(__dirname, '.env') })
import { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(env => {
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    root: join(__dirname, 'src/render'),
    base: './',
    server: {
      port: pkg.env.PORT
    },
    resolve: {
      alias: {
        '@root': __dirname,
        '@': join(__dirname, 'src')
      }
    },
    build: {
      outDir: join(__dirname, 'dist/render'),
      emptyOutDir: true,
      minify: false,
      commonjsOptions: {},
      sourcemap: true
    }
  }
})
