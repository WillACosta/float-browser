const {
  app,
  BrowserWindow,
  globalShortcut
} = require('electron')

const path = require('path')

require('electron-reload')(__dirname)

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: true,
    titleBarStyle: 'customButtonsOnHover',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
  // mainWindow.loadUrl(`file://${__dirname}/index.html`) //Electron live-reload
}

function OpenDevTools() {
  mainWindow.webContents.toggleDevTools();
}

function fullScreen() {
  mainWindow.isSimpleFullScreen() ? mainWindow.setSimpleFullScreen(false) : mainWindow.setSimpleFullScreen(true);
}

function createShortcut() {
  globalShortcut.register('F11', fullScreen);
  globalShortcut.register('F12', OpenDevTools);
}

app.whenReady()
  .then(createWindow)
  .then(createShortcut);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});