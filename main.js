const { app, BrowserWindow } = require('electron')
const path = require('path');
function createWindow () {
    // Create the browser window
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            icon: path.join(__dirname, 'path_to_your_icon.ico')
        }
    })

    // Load the index.html file
    win.loadFile('index.html')
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS, re-create a window if there are no windows open and the dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
