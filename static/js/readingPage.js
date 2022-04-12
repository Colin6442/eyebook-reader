// Borrowed from https://forums.tumult.com/t/replace-inner-html-with-text-from-an-external-file/2129/3
fetch('../../uploads/upload.txt')
  .then(response => response.text())
  .then(text => document.getElementById("txtSect").innerHTML = text)
