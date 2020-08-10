const { ipcRenderer } = require("electron");
const fileInfo2 = require("./fileInfo2");

const MediaInfo = require("mediainfo.js");

MediaInfo({format: "object"}, (mediainfo) => {
  window.addEventListener("keydown", (event) => {
    const videoElement = document.getElementById("video-file");
    const filePath = videoElement.getAttribute("src");

    if(event.key == "Shift") {
      document.getElementById("file-info1").hidden = false;

      const result = fileInfo2.onChangeFile(mediainfo, filePath);

      document.getElementById("file-info1").innerText = result;
    }
  })
})

window.addEventListener("keydown", (event) => {
  const videoElement = document.getElementById("video-file");
  const filePath = videoElement.getAttribute("src");
  const currentTime = videoElement.currentTime;

  if (!filePath) return false;

  switch (event.key) {
    // case "Shift":
    //   document.getElementById("file-info1").hidden = false;

    //   const fileInfo = ipcRenderer.sendSync("getFileInfo", [filePath, currentTime]);

    //   document.getElementById("file-info1").innerText = fileInfo;

    //   break;

    case ",":
      const rearFrame = Math.max(0, currentTime - (1 / 60));
      videoElement.currentTime = rearFrame;

      break;

    case ".":
      const frontFrame = Math.max(0, currentTime + (1 / 60));
      videoElement.currentTime = frontFrame;

      break;

    default:
      return false;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "Shift":
      document.getElementById("file-info1").hidden = true;

      break;

    default:
      return false;
  }
});