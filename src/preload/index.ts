/**
 * Bridge between main process and renderer process
 */
import fs from 'fs'
import { ipcRenderer } from 'electron'
import Store from 'electron-store'
import { contextBridge } from 'electron'
import { domReady, injectWsCode } from './utils'
import { useLoading } from './loading'

const isDev = process.env.NODE_ENV === 'development'
const { removeLoading, appendLoading } = useLoading()

domReady().then(() => {
  appendLoading()
  isDev && injectWsCode({
    host: '127.0.0.1',
    port: process.env.PORT_WS, // process.env.npm_package_env_PORT_WS
  })
})

contextBridge.exposeInMainWorld('bridge', {
  __dirname,
  __filename,
  fs,
  ipcRenderer,
  removeLoading,
  store: new Store, // not worked!
  env: JSON.parse(JSON.stringify(process.env)), // deep clone is required
})
