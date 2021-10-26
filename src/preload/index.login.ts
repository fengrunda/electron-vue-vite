import { contextBridge } from 'electron'
import { domReady } from './utils'
import { useLoading } from './loading'
import { bridge } from '../common/ipc/render'

const { removeLoading, appendLoading } = useLoading()

domReady().then(appendLoading)

// --------- Expose some API to Renderer process. ---------
contextBridge.exposeInMainWorld('bridge', {
  ...bridge,
  removeLoading,
})
