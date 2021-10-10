import { createApp, App } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIcons from '@element-plus/icons'
import AppComp from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'
import '@/render/assets/style/bootstrap-5.0.2.less'
import './global.less'

function ElementPlusIconsRegister(app: App) {
  for (const [name, icon] of Object.entries(ElementPlusIcons)) {
    app.component(name, icon)
  }
}

createApp(AppComp)
  .use(router)
  .use(ElementPlus)
  .use(ElementPlusIconsRegister)
  .mount('#app')
  .$nextTick(window.bridge.removeLoading)
