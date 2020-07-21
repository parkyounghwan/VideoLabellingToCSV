const fileInfo = require("./fileInfo");

(() => {
  const holder = document.getElementById("drag-file");
  const video = document.querySelector("#drag-file > video");
  
  holder.ondragover = () => {
    return false;
  };
  
  holder.ondragleave = () => {
    return false;
  };
  
  holder.ondragend = () => {
    return false;
  };
  
  holder.ondrop = (event) => {
    event.preventDefault();
    
    for (let file of event.dataTransfer.files) {
      
      video.src = file.path;
      video.hidden = false;

      const videoPath = file.path;

      document.getElementById("video-path").innerText = videoPath;

      fileInfo(videoPath)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          throw err;
        })

      document.querySelector("#drag-file > h1").hidden = true;
    }

    return false;
  };
})();