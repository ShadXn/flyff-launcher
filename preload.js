const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.innerHTML = `
        body { padding-top: 30px; }
    `;
    document.head.appendChild(style);
});

contextBridge.exposeInMainWorld('electron', {
    minimize: () => ipcRenderer.send('minimize-app'),
    maximize: () => ipcRenderer.send('maximize-app'),
    close: () => ipcRenderer.send('close-app'),
});
