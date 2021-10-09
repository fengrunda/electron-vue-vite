require('dotenv').config({ path: path.join(__dirname, '.env') })

import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({/* options are passed on to @vue/babel-plugin-jsx */ }),
    // 按需加载antd style文件
    styleImport({
      libs: [
        {
          libraryName: "ant-design-vue",
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index.js`;
          },
        },
      ],
    }),
  ],
  root: path.join(__dirname, 'src/render'),
  base: './',
  server: {
    port: +process.env.PORT,
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
    // jsxInject: `import { h } from 'vue'`, 通过 @vitejs/plugin-vue-jsx 解决
  },
  css: {
    preprocessorOptions: {
      less: {
        // 通过modifyVars定义、覆盖全局less变量可设置ant-design-vue主题相关样式
        // modifyVars: {
        //   "primary-color": "#343f4c",
        // },
        javascriptEnabled: true,
      },
    },
  },
})
