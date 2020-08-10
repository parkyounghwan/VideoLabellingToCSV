
window.addEventListener("keydown", (event) => {
  const videoElement = document.getElementById("video-file");
  const filePath = videoElement.getAttribute("src");
  const currentTime = videoElement.currentTime;

  if (!filePath) return false;

  switch (event.key) {
    case "Shift":
      document.getElementById("file-info").hidden = false;

      const videoFps = document.getElementById("video-fps").innerText;
      const videoFrameCount = document.getElementById("video-frame-count").innerText;
      const videoDuration = document.getElementById("video-duration").innerText;

      const currentFrame = Math.floor(currentTime * videoFps);

      console.log(currentTime);
      console.log(videoFps);

      const info = `FrameRate:${videoFps} FrameCount:${videoFrameCount} Duration:${videoDuration} CurrentTime:${currentTime} CurrentFrame:${currentFrame}`;

      document.getElementById("file-info").innerText = info;

      break;

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
      document.getElementById("file-info").hidden = true;

      break;

    default:
      return false;
  }
});