(function() {
  'use strict';

  const prog = document.querySelector('#progress');
  const progress = document.querySelector('#progressbar');

  const dropArea = document.getElementsByClassName("dropboxzone")[0];

  dropArea.addEventListener("dragover", dragOverHandler, false);
  //dropArea.addEventListener("dragstart", dragStartHandler, false);
  dropArea.addEventListener("drop", dropHandler, false);

  function dragOverHandler(event) {
    event.preventDefault();
  }

  function dropHandler(event) {
    event.preventDefault();
    Array.prototype.forEach.call(event.dataTransfer.items, fileItem => {
      // If dropped items aren't files, reject them
      if (fileItem.kind === 'file') {
        const file = fileItem.getAsFile();

        uploadFile(file);
      }
    });
  }

  function uploadFile(file) {
    const request = new XMLHttpRequest();
    const formData = new FormData();

    formData.append('file', file, file.name);

    request.open("POST", "/upload", true);
    request.upload.addEventListener("progress", fileUpdateProgress, false);
    request.send(formData);
  }

  function fileUpdateProgress(e) {
    var pc = e.loaded / e.total * 100;
    progress.style.width = pc + "%";
    prog.innerText = pc;
    console.log('youhou ça marche', e.loaded / e.total,  pc);
    if(pc === 100) {
      setInterval( function(){ 
        prog.innerText = 0;
      }, 1000);
    }
  };
}());
