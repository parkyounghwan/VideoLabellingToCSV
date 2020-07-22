const fileInfo = require("./fileInfo");

document.addEventListener("keydown", async (event) => {
  const videoFile = document.getElementById("video-file");
  const fps = document.getElementById("video-fps").innerText;

  switch (event.which) {
    case 16:
      document.getElementById("file-info").hidden = false;

      const filePath = document.getElementById("video-path").innerText;

      const result = await fileInfo(filePath);

      const videoInfo = result.media.track[1];
      const frameRate = Number.parseInt(videoInfo.FrameRate);
      const frameCount = Number.parseInt(videoInfo.FrameCount);
      const duration = Number.parseInt(videoInfo.Duration);
      const currentTime = videoFile.currentTime;
      const currentFrame = Math.floor(currentTime * frameRate);

      const info = {
        FrameRate: frameRate,
        FrameCount: frameCount,
        Duration: duration,
        CurrentTime: currentTime,
        CurrentFrame: currentFrame
      }

      document.getElementById("file-info").innerText = JSON.stringify(info, null, '\t');
      break;

    case 37:
      const rearFrame = Math.max(0, videoFile.currentTime - (1 / fps));
      videoFile.currentTime = rearFrame;

      break;

    case 39:
      const forwardFrame = Math.min(videoFile.duration, videoFile.currentTime + (1 / fps));
      videoFile.currentTime = forwardFrame;
      
      break;

    default:
      return false;
  }
});

document.addEventListener("keyup", (event) => {
  document.getElementById("file-info").hidden = true;
})