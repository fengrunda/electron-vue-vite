
export { }
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production'
  }
}

declare global {
  interface Window {
    /** 过桥通讯 */
    bridge: ExposeBridge
  }
}

interface ExposeBridge {
  /** 关闭预加载动画 */
  removeLoading: () => void

  /** Electron.IpcRenderer  */
  ipcRenderer: Electron.IpcRenderer

  /** 登录 */
  login: () => void

  /** 退出 */
  logout: () => void
}
