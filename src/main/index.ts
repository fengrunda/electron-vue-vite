import path from 'path'
import { app, BrowserWindow } from 'electron'
import { toggleDevtools } from './communication'

app.whenReady().then(login)

app.on('window-all-closed', () => {
  Object.keys(windows).forEach(key => {
    windows[key] = null
  })
  app.quit()
})

// ----------------------------------------------------------------------

const windows: Record<string, BrowserWindow | null> = {}

function main() {
  windows.main = new BrowserWindow({
    webPreferences: {},
  })

  if (app.isPackaged) {
    windows.main.loadFile(path.join(__dirname, '../render/index.html'))
  } else {
    windows.main.maximize()
    windows.main.webContents.openDevTools()
    windows.main.loadURL(`http://localhost:${process.env.PORT}`)
  }

  // something init setup

  toggleDevtools(windows.main)
}

function login() {
  windows.login = new BrowserWindow({
    title: '登录',
    width: 540, // 宽高和拼多多官方保持一致 
    height: 390,
    resizable: false, // 不让缩放
    frame: !app.isPackaged, // 打包后去掉边框
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
    },
  })

  if (app.isPackaged) {
    windows.login.loadFile(path.join(__dirname, '../render/login/index.html'))
  } else {
    windows.login.loadURL(`http://localhost:${process.env.PORT}/login/index.html`)
  }
}

