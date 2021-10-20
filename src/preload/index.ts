/**
 * Bridge between main process and renderer process
 */
import fs from 'fs'
import { ipcRenderer } from 'electron'
import Store from 'electron-store'
import { contextBridge } from 'electron'
import { domReady } from './utils/dom'
import { useLoading } from './loading'

const { removeLoading, appendLoading } = useLoading()

domReady().then(appendLoading)

contextBridge.exposeInMainWorld('bridge', {
  __dirname,
  __filename,
  fs,
  ipcRenderer,
  removeLoading,
  // not worked!
  store: new Store,
})
