const { app, BrowserWindow, ipcMain, BrowserView } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        icon: path.join(__dirname, 'assets', 'favicon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true
        },
    });

    let view = new BrowserView();
    win.setBrowserView(view);
    view.setBounds({ x: 0, y: 30, width: 800, height: 570 }); // Initial bounds
    view.webContents.loadURL('https://universe.flyff.com/play');

    win.loadFile('index.html');
    win.setAutoHideMenuBar(true);
    win.setMenuBarVisibility(false);

    // Update BrowserView bounds when the window is resized
    win.on('resize', () => {
        const [width, height] = win.getContentSize(); // Get new size of the window
        view.setBounds({ x: 0, y: 30, width: width, height: height - 30 }); // Adjust height for title bar
    });

    // Handle maximize and unmaximize separately if needed
    win.on('maximize', () => {
        const [width, height] = win.getContentSize();
        view.setBounds({ x: 0, y: 30, width: width, height: height - 30 });
    });
    win.on('unmaximize', () => {
        const [width, height] = win.getContentSize();
        view.setBounds({ x: 0, y: 30, width: width, height: height - 30 });
    });
}

app.whenReady().then(createWindow);

ipcMain.on('minimize-app', () => {
    const window = BrowserWindow.getFocusedWindow();
    window.minimize();
});

ipcMain.on('maximize-app', () => {
    const window = BrowserWindow.getFocusedWindow();
    if (window.isMaximized()) {
        window.unmaximize();
    } else {
        window.maximize();
    }
});

ipcMain.on('close-app', () => {
    const window = BrowserWindow.getFocusedWindow();
    window.close();
});
