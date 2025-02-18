
/** docoment ready */
export function domReady (condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

/** Inject ws related code */
export function injectWsCode (options: {
  host: string
  port: string | number
}) {
  const oScript = document.createElement('script')
  oScript.id = 'ws-preload-hot-reload'

  oScript.innerHTML = `
${__WS_HOT_RELOAD_FOR_PRELOAD.toString()}
${__WS_HOT_RELOAD_FOR_PRELOAD.name}(${JSON.stringify(options)})
`

  document.body.appendChild(oScript)
}

function __WS_HOT_RELOAD_FOR_PRELOAD (options: { host: string; port: string | number }) {
  const ws = new WebSocket(`ws://${options.host}:${options.port}`)
  ws.onmessage = function (ev) {
    try {
      console.log('[preload] ws.onmessage:', ev.data)

      const data = JSON.parse(ev.data) // { "cmd": "string", data: "string|number" }

      if (data.cmd === 'reload') {
        setTimeout(() => window.location.reload(), 999)
      }
    } catch (error) {
      console.warn('ws.onmessage should be accept "JSON.string" formatted string.')
      console.error(error)
    }
  }
}
