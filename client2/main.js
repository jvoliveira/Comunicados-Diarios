const { app, BrowserWindow } = require('electron')

function createWindow () {
  // verify the screen size
  const electron = require('electron');
var screenElectron = electron.screen;
var mainScreen = screenElectron.getPrimaryDisplay();

// console.log(mainScreen);





  let win = new BrowserWindow({ x:mainScreen.bounds.width - 350, y:mainScreen.bounds.height-490, width: 350, height: 450, transparent:true, frame:false, webPreferences: {nodeIntegrationInWorker: true } })

  win.setMenu(null);
  // win.setSkipTaskbar(true);

  // and load the index.html of the app.
  win.loadFile('index.html');
  win.openDevTools();
}

function abrir(){
    setTimeout(createWindow, 1000);
}


app.on('ready', abrir)
