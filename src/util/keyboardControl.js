const fileInfo = require("./fileInfo");

const videoFile = document.getElementById("video-file");
const fps = document.getElementById("video-fps").innerText;

window.addEventListener("keydown", async (event) => {
  const videoFile = document.getElementById("video-file");
  const filePath = videoFile.getAttribute("src");

  if (!filePath) return false;

  switch (event.which) {
    case 16:  // 'Shift'
      document.getElementById("file-info1").hidden = false;
      document.getElementById("file-info2").hidden = false;

      const result = await fileInfo(filePath);

      const videoInfo = result.media.track[1];
      const frameRate = Number.parseInt(videoInfo.FrameRate);
      const frameCount = Number.parseInt(videoInfo.FrameCount);
      const duration = Number.parseInt(videoInfo.Duration);
      const currentTime = videoFile.currentTime;
      const currentFrame = Math.floor(currentTime * frameRate);

      const info = `FrameRate:${frameRate} FrameCount:${frameCount} Duration:${duration} CurrentTime:${currentTime} CurrentFrame:${currentFrame}`;

      document.getElementById("file-info1").innerText = info;
      document.getElementById("file-info2").innerText = info;

      break;

    default:
      return false;
  }
});

window.addEventListener("keypress", (event) => {  
  if (!event.repeat) {
    console.log(`Key "${event.key}" pressed  [event: keydown]`);
    const videoFile = document.getElementById("video-file");

    if (event.key == ',') {
      const rearFrame = Math.max(0, videoFile.currentTime - (1 / 60));
      videoFile.currentTime = rearFrame;
    } else if (event.key == '.') {
      const rearFrame = Math.max(0, videoFile.currentTime + (1 / 60));
      videoFile.currentTime = rearFrame;
    }
  } else {
    console.log(`Key "${event.key}" repeating  [event: keydown]`);
    // if (event.key === ",") {
    //   const rearFrame = Math.max(0, videoFile.currentTime - (1 / 60));
    //   videoFile.currentTime = rearFrame;
    // } else if (event.key === ".") {
    //   const rearFrame = Math.max(0, videoFile.currentTime - (1 / 60));
    //   videoFile.currentTime = rearFrame;
    // }
  }
});

window.addEventListener("keyup", (event) => {
  if (event.which == 16) {
    document.getElementById("file-info1").hidden = true;
    document.getElementById("file-info2").hidden = true;

    return false;
  }
})

const changeState = (event) => {
  if(event.key == ",") {

  }

  if(event.key == ".") {

  }
}