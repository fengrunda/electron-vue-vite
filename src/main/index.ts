import path from 'path'
import { app, BrowserWindow } from 'electron'
import { register } from '../common/ipc/main'

const windows: Record<string, BrowserWindow | null> = {}

function mainWin() {
  if (windows.main) {
    windows.main.show()
    return
  }

  windows.main = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.main.js'),
    },
  })

  if (app.isPackaged) {
    windows.main.loadFile(path.join(__dirname, '../render/index.html'))
  } else {
    register.toggleDevtools(windows.main)
    windows.main.webContents.openDevTools()
    windows.main.maximize()
    windows.main.loadURL(`http://localhost:${process.env.PORT}`)
  }
}

function loginWin() {
  if (windows.login) {
    windows.login.show()
    return
  }

  windows.login = new BrowserWindow({
    width: 540, // 宽高和拼多多官方保持一致 
    height: 390,
    resizable: false,
    // frame: !app.isPackaged, // 打包后去掉边框
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.login.js'),
    },
  })

  if (app.isPackaged) {
    windows.login.loadFile(path.join(__dirname, '../render/login/index.html'))
  } else {
    windows.login.loadURL(`http://localhost:${process.env.PORT}/login/index.html`)
  }
}

// ----------------------------------------------------------------------

app.on('window-all-closed', () => {
  Object.keys(windows).forEach(key => {
    windows[key] = null
  })
  app.quit()
})

app.whenReady().then(() => {
  // register some ipc handle
  register
    .login(() => {
      windows.login && windows.login.hide()
      mainWin()
    })
    .logout(() => {
      windows.main && windows.main.hide()
      loginWin()
    })

  // open login BrowserWindow
  loginWin()
})
