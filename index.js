const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(`${__dirname}/resources/html/main.html`);
  mainWindow.webContents.openDevTools();  // 브라우저 개발자 도구

  mainWindow.on("closed", () => {
    mainWindow = null;
  }); 
}

app.on("ready", () => {
  createWindow();
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
})