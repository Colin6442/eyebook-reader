fetch('../../uploads/upload.txt')
  .then(response => response.text())
  .then(text => document.getElementById("txtSect").innerHTML = text)
