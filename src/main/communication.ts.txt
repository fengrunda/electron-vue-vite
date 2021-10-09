/**
 * Expose something function to renderer
 */
import { BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron'
import {
  LOGIN,
  LOGOUT,
  TOGGLE_DEVTOOLS,
} from '@/common/constant/event'

export function toggleDevtools(win: BrowserWindow) {
  ipcMain.handle(TOGGLE_DEVTOOLS, () => {
    win.webContents.toggleDevTools()
  })
}

export function logout() {
  ipcMain.handle(LOGOUT, () => {})
}

// ----------------------------------------------------------------------

export type Noop = () => void

export type Observer = (evnet: IpcMainInvokeEvent, ...args: any[]) => void

export interface Subscribe {
  (observer: Observer): UnSubscribe
}

export interface UnSubscribe {
  (): void
}

export function _ipcWithSubscribe(name: string): { subscribe: Subscribe } {
  const observers: Observer[] = []

  ipcMain.handle(name, (event, ...args: any[]) => {
    for (const observer of observers) {
      observer(event, ...args)
    }
  })

  const subscribe = (observer: Observer) => {
    observers.push(observer)

    return () => {
      for (let l = observers.length, x = l - 1; x > 0; x--) {
        const obsr = observers[x]
        if (obsr === observer) {
          observers.splice(x, 1)
        }
      }
    }
  }

  return { subscribe }
}
