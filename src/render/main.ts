import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'
import '@/render/assets/style/bootstrap-5.0.2.less'
import './global.less'

createApp(App)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
  .$nextTick(window.bridge.removeLoading)
