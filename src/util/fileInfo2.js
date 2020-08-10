// const fileinput = document.getElementById('fileinput')
// const output = document.getElementById('output')

// const output2 = document.getElementById("file-info1");

const MediaInfo = require("mediainfo.js");

const onChangeFile = (mediainfo, filePath) => {
  // const file = fileinput.files[0]
  const file = filePath;

  if (file) {
    output2.innerText = 'Working…'
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
        output2.innerText = result
      })
      .catch((error) => {
        output2.innerText = `An error occured:\n${error.stack}`
      })
  }
}

module.exports = {
  onChangeFile
}

// MediaInfo({ format: 'text' }, (mediainfo) => {
//   fileinput.addEventListener('change', () => onChangeFile(mediainfo));

//   window.addEventListener("keydown", (event) => {
//     if(event.key == "Shift") {
//       onChangeFile(mediainfo);
//     }
//   });

// })