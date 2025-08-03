window.addEventListener("load", () => {
    const input = document.getElementById("upload");
    const filewrapper = document.getElementById("filewrapper");

    input.addEventListener("change", (e) => {
        let fileName = e.target.files[0].name;
        let fileType = e.target.value.split(".").pop();
        fileshow(fileName, fileType);
    });

    const fileshow = (fileName, fileType, fileUrl) => {
        const showfileboxElem = document.createElement("div");
        showfileboxElem.classList.add("showfilebox");

        showfileboxElem.setAttribute('data-fileurl', fileUrl);
        showfileboxElem.setAttribute('data-filename', fileName);

        const leftElem = document.createElement("div");
        leftElem.classList.add("left");

        const fileTypeElem = document.createElement("span");
        fileTypeElem.classList.add("filetype");
        fileTypeElem.innerHTML = fileType;
        leftElem.append(fileTypeElem);

        const filetitleElem = document.createElement("h3");
        filetitleElem.innerHTML = fileName;
        leftElem.append(filetitleElem);

        showfileboxElem.append(leftElem);

        const rightElem = document.createElement("div");
        rightElem.classList.add("right");
        showfileboxElem.append(rightElem);

        const crossElem = document.createElement("span");
        crossElem.innerHTML = "&#215";

        rightElem.append(crossElem);
        filewrapper.append(showfileboxElem);

        crossElem.addEventListener("click", () => {
            filewrapper.removeChild(showfileboxElem);
        });
    }
});

// Create a file and return link in the server

const input = document.querySelector('#fileinput');

input.addEventListener('change', async function () {
  const file = this.files[0];
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/upload-endpoint', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    const result = await response.json(); // Assume server returns file URL
    createFileBox(file.name, result.fileUrl);
  } else {
    alert('Upload failed.');
  }
});