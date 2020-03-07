const { app, BrowserWindow } = require('electron')
const func = require('./close.js')
const path = require('path')
function createWindow () {
  let win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // 不推荐打开，建议使用预加载的方式
      // nodeIntergration: true
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  })
  win.loadFile('./dist.vue/index.html')
  win.on('close', event => {
    func()
  })
}

app.whenReady().then(createWindow)
app.on('window-all-closed', event => {
  func()
})