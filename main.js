const { app, BrowserWindow, ipcMain } = require("electron");
const fileInfo = require("./src/util/fileInfo");

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
  const path = response[0];
  const name = response[1];
  const size = response[2];

  event.returnValue = {
    "path": path,
    "name": name,
    "size": size
  }
});

ipcMain.on("getFileInfo", async (event, response) => {
  const filePath = response[0];
  const time = response[1];

  const result = await fileInfo(filePath);

  const videoInfo = result.media.track[1];
  const frameRate = Number.parseInt(videoInfo.FrameRate);
  const frameCount = Number.parseInt(videoInfo.FrameCount);
  const duration = Number.parseInt(videoInfo.Duration);
  const currentTime = time;
  const currentFrame = Math.floor(currentTime * frameRate);

  const info = `FrameRate:${frameRate} FrameCount:${frameCount} Duration:${duration} CurrentTime:${currentTime} CurrentFrame:${currentFrame}`;

  event.returnValue = info;
});
