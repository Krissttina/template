const fileInput = document.getElementById('fileinput');
const fileList = document.getElementById('filelist');

fileInput.addEventListener('change', async function () {
  const file = this.files[0];
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/upload', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  if (res.ok) {
    const fileUrl = data.fileUrl;
    const fileName = file.name;

    // Create and insert the clickable showfilebox
    const div = document.createElement('div');
    div.className = 'showfilebox';
    div.setAttribute('data-fileurl', fileUrl);
    div.setAttribute('data-filename', fileName);
    div.innerHTML = `
      <div class="left">
        <span class="filetype">${fileName.split('.').pop()}</span>
        <h3>${fileName}</h3>
      </div>
      <div class="right">
        <span>-</span>
      </div>
    `;
    fileList.appendChild(div);
  } else {
    alert('Upload failed');
  }
});