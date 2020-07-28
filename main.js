const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = true;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    backgroundColor: "#fff",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(`${__dirname}/resources/html/main.html`);
  mainWindow.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("ondrop", (event, response) => {
  const filePath = response[0];
  const fileName = response[1];

  event.returnValue = {
    "filePath": filePath,
    "fileName": fileName
  }
});