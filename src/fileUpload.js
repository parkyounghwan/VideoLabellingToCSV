(() => {

  const holder = document.getElementById("drag-file");
  const video = document.querySelector("#drag-file > video");
  
  holder.ondragover = () => {
    return false;
  };
  
  holder.ondragleave = () => {
    return false;
  };
  
  holder.ondragend = () => {
    return false;
  };
  
  holder.ondrop = (event) => {
    event.preventDefault();
    
    for (let file of event.dataTransfer.files) {

      console.log("File(s) you dragged here: ", file.path)
      
      video.src = file.path;
      video.hidden = false;
    }

    return false;
  };

})();