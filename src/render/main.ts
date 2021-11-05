import { createApp } from 'vue'
import App from './App.vue'
import store, { key } from './store'
import router from './router'
import '@/render/styles/index.scss'

createApp(App)
  .use(store, key)
  .use(router)
  .mount('#app')
  .$nextTick(window.removeLoading)

console.log('fs', window.fs)
console.log('ipcRenderer', window.ipcRenderer)
console.log('xlsx', window.xlsx)
