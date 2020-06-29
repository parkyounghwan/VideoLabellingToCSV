const MediaInfo = require('mediainfo.js');

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

      console.log("file: ", file);

      MediaInfo({ format: 'object' }, (mediainfo) => {
        (() => {
          onChangeFile(file, mediainfo);
        })();
      })

      document.querySelector("#drag-file > h1").hidden = true;
    }

    return false;
  };
})();

const onChangeFile = (file, mediainfo) => {
  if (file) {
    // output.value = 'Working…'

    const getSize = () => file.size

    const readChunk = (chunkSize, offset) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target.error) {
            reject(event.target.error)
          }
          resolve(new Uint8Array(event.target.result))
        }
        reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
      })

    mediainfo
      .analyzeData(getSize, readChunk)
      .then((result) => {
        // output.value = result
        console.log(result);
        console.log(result.media.track[0]);
        console.log("duration: ", result.media.track[0].Duration);
        console.log("FrameCount: ", result.media.track[0].FrameCount);
        console.log("FrameRate: ", result.media.track[0].FrameRate);
      })
      .catch((error) => {
        // output.value = `An error occured:\n${error.stack}`
        console.log(error.stack);
      })
  }
}
