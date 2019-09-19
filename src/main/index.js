const {
    app,
    BrowserWindow,
    Menu,
} = require('electron');

const { client } = require('electron-connect');

let win

if (module.hot) {
    module.hot.accept();
}

function createWindow() {
    win = new BrowserWindow({
        width: 1080,
        height: 720,
        webPreferences: { nodeIntegration: true }
    })
    win.loadFile('../index.html')
    // if (process.env == "development") {
    //     win.webContents.openDevTools()
    // }
    win.webContents.openDevTools()
    win.on('closed', () => {
        win = null
    })
    const template = [
        {
          label: 'General',
          submenu: [
            { label: 'Reload', accelerator: 'CmdOrCtrl+R', role: 'reload' },  // not working...
            { label: 'Quit', accelerator: 'CmdOrCtrl+Q', role: 'quit' },
          ],
        },
        {
          label: 'Edit',
          submenu: [
            { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
            { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
            { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
            { label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectall' },
          ],
        },
      ];
      Menu.setApplicationMenu(Menu.buildFromTemplate(template));

      client.create(win);
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});
