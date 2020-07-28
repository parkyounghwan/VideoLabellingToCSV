const { ipcRenderer } = require("electron");
const fileInfo = require("./fileInfo");

const videoFileDropZone = document.getElementById("drop");

videoFileDropZone.ondrop = async (event) => {
  event.preventDefault();

  // 'Path', 'Name'
  const result = ipcRenderer.sendSync("ondrop", [event.dataTransfer.files[0].path, event.dataTransfer.files[0].name]);

  const filePath = result.filePath;
  const fileName = result.fileName;

  document.getElementById("video-file").src = filePath;
  document.getElementById("video-file").hidden = "";
  document.getElementById("video-name").innerText = fileName;

  // 'Metadata'
  const videoMetadata = await fileInfo(filePath);
  const frameRate = Number.parseInt(videoMetadata.media.track[1].FrameRate);

  document.getElementById("video-fps").innerText = frameRate;

  return false;
}

videoFileDropZone.ondragover = () => {
  return false;
};

videoFileDropZone.ondragleave = () => {
  return false;
};

videoFileDropZone.ondragend = () => {
  return false;
};