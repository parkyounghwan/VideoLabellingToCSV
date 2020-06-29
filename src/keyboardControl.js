const fps = 25;

window.addEventListener("keypress", (event) => {
  const video = document.querySelector("#drag-file > video");
  const frameNumberTag = document.getElementById("frame-number");

  console.log("event.keyCode: ", event.keyCode);

  if (video.hidden) {
    return false;
  }

  const frameNumber = getCurrentVideoFrame(video, fps);

  if (event.keyCode == 113) {
    const videoPath = video.src;

    const video1 = document.createElement("video");
    video1.src = videoPath;

    console.log(video1.files);

    // if (file) {
    //   MediaInfo({ format: 'object' }, (mediainfo) => {
    //     (() => {
    //       console.log("key board control");
    //       onChangeFile(fileObj, mediainfo);
    //     })();
    //   })
    // }

  }

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

// const onChangeFile = (file, mediainfo) => {
//   if (file) {

//     const getSize = () => file.size

//     const readChunk = (chunkSize, offset) =>
//       new Promise((resolve, reject) => {
//         const reader = new FileReader()
//         reader.onload = (event) => {
//           if (event.target.error) {
//             reject(event.target.error)
//           }
//           resolve(new Uint8Array(event.target.result))
//         }
//         reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
//       })

//     mediainfo
//       .analyzeData(getSize, readChunk)
//       .then((result) => {
//         // output.value = result
//         console.log(result);
//         console.log(result.media.track[0]);
//         console.log("duration: ", result.media.track[0].Duration);
//         console.log("FrameCount: ", result.media.track[0].FrameCount);
//         console.log("FrameRate: ", result.media.track[0].FrameRate);
//       })
//       .catch((error) => {
//         // output.value = `An error occured:\n${error.stack}`
//         console.log(error.stack);
//       })
//   }
// }
