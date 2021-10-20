import { createApp } from 'vue'
import App from './App'
import router from './router'
import { event } from '@/common/constant'

import 'ant-design-vue/es/style/index.less'
import '@/render/assets/style/bootstrap-5.0.2.less'
import './global.less'

createApp(App)
  .use(router)
  .mount('#app')
  .$nextTick(window.bridge.removeLoading)

console.log('window.bridge', window.bridge)

// use electron-store
const store = {
  async get(key: string) {
    const { invoke } = window.bridge.ipcRenderer
    let value = await invoke(event.ELECTRON_STORE, 'get', key)
    try {
      value = JSON.parse(value)
    } finally {
      return value
    }
  },
  async set(key: string, value: any) {
    const { invoke } = window.bridge.ipcRenderer
    let val = value
    try {
      if (value && typeof value === 'object') {
        val = JSON.stringify(value)
      }
    } finally {
      await invoke(event.ELECTRON_STORE, 'set', key, val)
    }
  },
}

;(async () => {
  await store.set('user', { name: 'Kevin', time: Date.now() })

  store.get('user').then(user => {
    console.log('use electron-store get user value:', user)
  })

})()
