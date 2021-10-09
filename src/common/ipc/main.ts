/**
 * Expose something function to renderer
 */
import { BrowserWindow, ipcMain } from 'electron'
import { LOGIN, LOGOUT, TOGGLE_DEVTOOLS } from '../constant/event'
import { IpcHandleListener } from '../types'

export const register = {
  toggleDevtools(win: BrowserWindow) {
    ipcMain.handle(TOGGLE_DEVTOOLS, () => {
      win.webContents.toggleDevTools()
    })
    return register
  },
  login(listener: IpcHandleListener) {
    ipcMain.handle(LOGIN, listener)
    return register
  },
  logout(listener: IpcHandleListener) {
    ipcMain.handle(LOGOUT, listener)
    return register
  },
}
