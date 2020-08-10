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
  const filePath = response[0];
  const fileName = response[1];

  event.returnValue = {
    "filePath": filePath,
    "fileName": fileName
  }
});

ipcMain.on("getFileInfo", async (event, response) => {
  const filePath = response[0];
  const time = response[1];

  /**
  let videoInfo;
  let frameRate;
  let frameCount;
  let duration;
  let currentTime;
  let currentFrame;

  fileInfo(filePath)
    .then((result) => {
      videoInfo = result.media.track[1];
      frameRate = Number.parseInt(videoInfo.FrameRate);
      frameCount = Number.parseInt(videoInfo.FrameCount);
      duration = Number.parseInt(videoInfo.Duration);
      currentTime = time;
      currentFrame = Math.floor(currentTime * frameRate);

      const info = `FrameRate:${frameRate} FrameCount:${frameCount} Duration:${duration} CurrentTime:${currentTime} CurrentFrame:${currentFrame}`;

      event.returnValue = info;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      delete fileInfo;
    });
   */

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
