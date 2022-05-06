import os

from flask import render_template, redirect, request, url_for, Flask, flash, send_from_directory
# from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename

UpFolder = './uploads/'

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
# app.config['SQLALCHMEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = UpFolder
app.secret_key = 'keep secret'  # placeholder
# db = SQLAlchemy(app)

# function that makes sure only one file is uploaded at a time. This wouldn't work in a real world server host of this website. Instead, we would use sql/databases to allow better control over the files that users attempt to upload, and make it entirely clientside.
def clearUploads():
    try:
        os.remove("./uploads/upload.epub")
    except OSError as e:
        print("Error: %s : %s" % ("./uploads/upload.epub", e.strerror))
    try:
        os.remove("./uploads/upload.txt")
    except OSError as e:
        print("Error: %s : %s" % ("./uploads/upload.epub", e.strerror))

# default route, rerouted to main page
@app.route('/', methods=['GET'])
def start():
    return redirect(url_for("home"))

# Main page route, which should clear uploads the moment it is enacted.
@app.route('/home', methods=['GET', 'POST'])
def home():
    clearUploads()
    return render_template('startPage.html')

# Calibration page that allow handles the taking of our file, since it directly comes after the main page where the user uploads his selected file
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

# Reading page, which takes in the first file of the directory, and since the directory should have been emptied, it would find the one and only file uploaded by the user. 
@app.route('/reading', methods=['GET', 'POST'])
def reading():
    fileType = os.listdir("./uploads")[0].rsplit('.',1)[1]
    return render_template('readingPage.html', fileType = fileType)

# Route that retrieves and returns the epub/txt file depending on the javascript behaviour in readingPage.js. 
@app.route('/upload/<fileType>', methods=['GET'])
def upload(fileType):
    if fileType == "txt":
        return send_from_directory(app.config['UPLOAD_FOLDER'], 'upload.txt')
    elif fileType == "epub":
        return send_from_directory(app.config['UPLOAD_FOLDER'], 'upload.epub')
    return send_from_directory(app.config['UPLOAD_FOLDER'], 'upload.txt')

# This function was created because the function above fails to work properly when returning epubs. But this function, which does the exact same, some how does work...
@app.route('/uploads/upload.epub', methods=['GET'])
def uploads():
    return send_from_directory(app.config['UPLOAD_FOLDER'], 'upload.epub')

if __name__ == "__main__":
    app.run()
