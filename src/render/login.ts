import { createApp } from 'vue'
import LoginForm from './login-form.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(LoginForm)
  .use(ElementPlus)
  .mount('#app')
  .$nextTick(window.bridge.removeLoading)
