(() => {
  const { ipcRenderer } = require("electron");

  const dropSpace = document.getElementById("drop");

  dropSpace.ondrop = (event) => {
    event.preventDefault();

    const fileList = event.dataTransfer.files;
    const file = fileList[0];

    const path = file.path;

    ipcRenderer.send("ondrop", path);
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