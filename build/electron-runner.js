const electron = require('electron')
const { app, BrowserWindow } = electron
console.log('app is', app)
function createWindow(){
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadURL(`http://localhost:8080/`)
}

app.on('ready', createWindow)