
export interface Noop {
  (): void
}

export interface IpcHandleListener {
  (event: Electron.IpcMainInvokeEvent, ...args: any[]): (Promise<void>) | (any)
}
