const fileinput = document.getElementById("fileinput");
const videoTag = document.getElementById("video-file");
const videoFps = document.getElementById("video-fps");
const videoFrameCount = document.getElementById("video-frame-count");
const videoDuration = document.getElementById("video-duration");

const MediaInfo = require("mediainfo.js");

const onChangeFile = (mediainfo) => {
  const file = fileinput.files[0]

  console.log(file);

  if (file) {

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
        const fps = result.media.track[0].FrameRate;
        const frameCount = result.media.track[0].FrameCount;
        const duration = result.media.track[0].Duration;

        videoTag.src = file.path;

        videoFps.innerText = Number.parseInt(fps);
        videoFrameCount.innerText = Number.parseInt(frameCount);
        videoDuration.innerText = Number.parseInt(duration);
      })
      .catch((error) => {
        console.log(error.stack);
      })
  }
}

MediaInfo({ format: 'object' }, (mediainfo) => {
  fileinput.addEventListener("change", () => {
    onChangeFile(mediainfo);
  });
})
