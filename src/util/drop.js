(() => {
  const fileInfo = require("./fileInfo");

  const dropSpace = document.getElementById("drop");

  dropSpace.ondrop = async (event) => {
    event.preventDefault();

    const fileList = event.dataTransfer.files;
    const file = fileList[0];

    const path = file.path;
    const name = file.name;
    
    const result = await fileInfo(path);
    const videoInfo = result.media.track[1];
    
    const frameRate = Number.parseInt(videoInfo.FrameRate);
    
    document.getElementById("video-file").src = path;
    document.getElementById("video-name").innerText = name;
    document.getElementById("video-fps").innerText = frameRate;

    document.getElementById("video-file").hidden = "";

    return false;
  };

  dropSpace.ondragover = () => {
    return false;
  };

  dropSpace.ondragleave = () => {
    return false;
  };

  dropSpace.ondragend = () => {
    return false;
  };
})();