const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({ width: 590, height: 290, transparent:true, frame:false, webPreferences: {nodeIntegrationInWorker: true } })

  win.setMenu(null)
  // and load the index.html of the app.
  win.loadFile('index.html')
  // win.openDevTools();
}

app.on('ready', createWindow)
