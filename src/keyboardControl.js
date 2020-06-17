const fps = 25;

window.addEventListener("keypress", (event) => {
  const video = document.querySelector("#drag-file > video");
  const frameNumberTag = document.getElementById("frame-number");

  if (video.hidden) {
    return false;
  }

  const frameNumber = getCurrentVideoFrame(video, fps);

  if (event.keyCode == 32) {
    frameNumberTag.innerText = frameNumber;

    return true;
  }

  if (event.keyCode == 97) {
    video.currentTime = Math.max(0, video.currentTime - (1 / fps));
    frameNumberTag.innerText = frameNumber;

    return true;
  }

  if (event.keyCode == 115) {
    video.currentTime = Math.min(video.duration, video.currentTime + (1 / fps));
    frameNumberTag.innerText = frameNumber;

    return true;
  }

  return false;
});

const getCurrentVideoFrame = (video, frameRate) => {
  const curTime = video.currentTime;

  return Math.floor(curTime * frameRate);
};