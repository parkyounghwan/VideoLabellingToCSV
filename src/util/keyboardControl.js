const fileInfo = require("./fileInfo");

const fps = 25;

window.addEventListener("keypress", (event) => {
  const video = document.querySelector("#drag-file > video");

  console.log("event.keyCode: ", event.keyCode);

  // if (video.hidden) {
  //   return false;
  // }

  // const frameNumber = getCurrentVideoFrame(video, fps);

  // if (event.keyCode == 113) {
  //   const videoPath = video.src;

  //   const video1 = document.createElement("video");
  //   video1.src = videoPath;

  //   console.log(video1.files);
  // }

  // if (event.keyCode == 32) {

  //   return true;
  // }

  // if (event.keyCode == 97) {
  //   video.currentTime = Math.max(0, video.currentTime - (1 / fps));

  //   return true;
  // }

  // if (event.keyCode == 115) {
  //   video.currentTime = Math.min(video.duration, video.currentTime + (1 / fps));

  //   return true;
  // }
  
  if (event.keyCode == 32) {
    const videoPath = document.getElementById("video-path").innerText;

    if(videoPath){
      fileInfo(document.getElementById("video-path").innerText);
    }

    return true;
  }

  return false;
});

const getCurrentVideoFrame = (video, frameRate) => {
  const curTime = video.currentTime;

  return Math.floor(curTime * frameRate);
};
