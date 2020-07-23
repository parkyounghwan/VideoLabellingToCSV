const fileInfo = require("./fileInfo");

document.addEventListener("keydown", async (event) => {
  const videoFile = document.getElementById("video-file");
  const filePath = videoFile.getAttribute("src");
  const fps = document.getElementById("video-fps").innerText;

  if(!filePath) return false;

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

    case 188:  // 'Left Arrow'
      const rearFrame = Math.max(0, videoFile.currentTime - (1 / fps));
      videoFile.currentTime = rearFrame;

      break;

    case 190:  // 'Right Arrow'
      const forwardFrame = Math.min(videoFile.duration, videoFile.currentTime + (1 / fps));
      videoFile.currentTime = forwardFrame;
      
      break;

    default:
      return false;
  }
  
  return false;
});

document.addEventListener("keyup", (event) => {
  if(event.which == 16) {
    document.getElementById("file-info1").hidden = true;
    document.getElementById("file-info2").hidden = true;

    return false;
  }

  return false;
})