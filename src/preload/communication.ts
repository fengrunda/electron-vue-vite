/**
 * Bridge between main process and renderer process
 */
import fs from 'fs'
import { ipcRenderer } from 'electron'
import Store from 'electron-store'

export const bridge = {
  __dirname,
  __filename,
  fs,
  ipcRenderer,
  store: new Store,
}
