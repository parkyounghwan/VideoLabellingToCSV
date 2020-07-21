const path = require("path");
const { open } = require('fs').promises
const MediaInfo = require("mediainfo.js");

module.exports = async (filePath) => {

  let fileHandle;
  let mediainfo;

  try {
    fileHandle = await open(filePath, 'r');
    mediainfo = await MediaInfo({ format: 'object' });  //object, JSON, XML, HTML, text

    const getSize = async () => (await fileHandle.stat()).size;

    const readChunk = async (size, offset) => {
      const buffer = new Uint8Array(size);

      await fileHandle.read(buffer, 0, size, offset);

      return buffer;
    };

    const result =  await mediainfo.analyzeData(getSize, readChunk);

    console.log(mediainfo.inform());
    console.log(mediainfo.openBufferContinueGotoGet());

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    fileHandle && (await fileHandle.close());
    mediainfo && mediainfo.close();
  }
}