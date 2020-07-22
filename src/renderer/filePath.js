const { ipcRenderer } = require("electron");

const fileInfo = require("../util/fileInfo");

ipcRenderer.on('sendDropFilePath', async (event, path) => {
  document.getElementById("video-file").src = path;
  document.getElementById("video-file").hidden = "";

  
  const result = await fileInfo(path);
  const videoInfo = result.media.track[1];

  const frameRate = Number.parseInt(videoInfo.FrameRate);
  
  document.getElementById("video-path").innerText = path;
  document.getElementById("video-fps").innerText = frameRate;
});