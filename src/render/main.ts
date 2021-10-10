import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/render/assets/style/bootstrap-5.0.2.less'
import './global.less'

createApp(App)
  .use(router)
  .mount('#app')
  .$nextTick(window.bridge.removeLoading)
