import path from 'path'
import { app, BrowserWindow } from 'electron'
import { register } from './communication'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'

let win: BrowserWindow | null = null

async function bootstrap () {
  win = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js')
    }
  })
  try {
    const name = await installExtension(VUEJS3_DEVTOOLS)
    console.log(`已安装: ${name}`)
  } catch (error) {
    console.log('无法安装 `vue-devtools`: \n', error)
  }
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../render/index.html'))
  } else {
    win.maximize()
    win.webContents.openDevTools({ mode: 'right', activate: true })
    win.loadURL(`http://localhost:${process.env.PORT}`)
  }

  // something init setup
  register(win)
}

app.whenReady().then(bootstrap)

app.on('window-all-closed', () => {
  win = null
  app.quit()
})
