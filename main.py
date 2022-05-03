import os

from flask import render_template, redirect, request, url_for, Flask, flash, send_from_directory
from werkzeug.utils import secure_filename

UpFolder = './uploads/'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UpFolder
app.secret_key = 'keep secret'  # placeholder

def clearUploads():
    try:
        os.remove("./uploads/upload.epub")
    except OSError as e:
        print("Error: %s : %s" % ("./uploads/upload.epub", e.strerror))
    try:
        os.remove("./uploads/upload.txt")
    except OSError as e:
        print("Error: %s : %s" % ("./uploads/upload.epub", e.strerror))

@app.route('/', methods=['GET'])
def start():
    return redirect(url_for("home"))


@app.route('/home', methods=['GET', 'POST'])
def home():
    clearUploads()
    return render_template('startPage.html')

@app.route('/calibration', methods=['GET', 'POST'])
def calibration():
    if request.method == "GET":
        return render_template('calibrationPage.html')
    if request.method == "POST":
        if 'file' not in request.files:
            return redirect(url_for("home"))
        file = request.files['file']
        if file.filename == '' or (file.filename[-3:] != "txt" and file.filename[-4:] != "epub"):
            return redirect(url_for("home"))
        if file:
            file.filename = "upload." + file.filename.rsplit('.',1)[1]
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return render_template('calibrationPage.html')
    return render_template('calibrationPage.html')
    
@app.route('/reading', methods=['GET', 'POST'])
def reading():
    fileType = os.listdir("./uploads")[0].rsplit('.',1)[1]
    return render_template('readingPage.html', fileType = fileType)

@app.route('/upload/<fileType>', methods=['GET'])
def upload(fileType):
    print(fileType)
    if fileType == "txt":
        return send_from_directory(app.config['UPLOAD_FOLDER'], 'upload.txt')
    elif fileType == "epub":
        return send_from_directory(app.config['UPLOAD_FOLDER'], 'upload.epub')
    return send_from_directory(app.config['UPLOAD_FOLDER'], 'upload.txt')

if __name__ == "__main__":
    app.run()
