# electron-vue-vite
`Electron` + `Vue3` + `Vite2` integration

## How and Why
- `Vite` is the scaffold of the future

## Feature
- `Main process` hot restart
- `Preload script` hot reload
- `Renderer process` hot module replacement -- power by Vite

## Command
- npm run dev
- npm run build

## Communication
- All NodeJs、Electron API invoke passed `Preload script`

## Branchs
- [ant-design-vue](https://github.com/caoxiemeihao/electron-vue-vite/tree/ant-design-vue)
  * [x] Use tsx
  * [x] Integration ant-design-vue
- [element-plus](https://github.com/caoxiemeihao/electron-vue-vite/tree/element-plus) `登录窗口、element-ui 这个可能很适合你` 🚀
  * [x] With multiple BrowserWindow
  * [x] Integration element-plus
  * [ ] Exit app on `window-all-closed`

## 微信讨论 / 请我喝茶

<img width="244px" src="https://raw.githubusercontent.com/caoxiemeihao/electron-vue-vite/main/blog/wx/qrcode.jpg" />

<img width="244px" src="https://raw.githubusercontent.com/caoxiemeihao/electron-vue-vite/element-plus/screenshot/wx-9.99.png" />

---

## License

[MIT License](https://opensource.org/licenses/MIT)
