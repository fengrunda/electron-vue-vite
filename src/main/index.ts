import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import Store from 'electron-store'
import { event } from '@/common/constant'

let win: BrowserWindow | null = null
const store = new Store

app.whenReady().then(bootstrap)

app.on('window-all-closed', () => {
  win = null
  app.quit()
})

// ----------------------------------------------------------------------

function bootstrap() {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
    },
  })

  // something init setup
  registerHandle(win)

  // show electron main window
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../render/index.html'))
  } else {
    win.maximize()
    win.webContents.openDevTools()
    win.loadURL(`http://localhost:${process.env.PORT}`)
  }
}

function registerHandle(win: BrowserWindow) {
  ipcMain.handle(event.TOGGLE_DEVTOOLS, () => {
    win.webContents.toggleDevTools()
  })

  ipcMain.handle(
    event.ELECTRON_STORE,
    (_evnet, methodSign: string, ...args: any[]) => store[methodSign](...args),
  )

}
