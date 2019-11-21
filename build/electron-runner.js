const electron = require('electron')
const { app, BrowserWindow } = electron
function createWindow(){
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadURL(`http://localhost:9972/`)
}

app.on('ready', createWindow)