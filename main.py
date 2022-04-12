import os
from flask import render_template, redirect, request, url_for, Flask, flash, send_from_directory
from werkzeug.utils import secure_filename

UpFolder = './uploads'
ALLOWED_EXTENSIONS = {'pdf','txt','epub'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UpFolder
app.secret_key = 'keep secret'  # placeholder

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['GET'])
def start():
    return redirect(url_for("home"))


@app.route('/home', methods=['GET', 'POST'])
def home():
    return render_template('startPage.html')

@app.route('/calibration', methods=['GET', 'POST'])
def calibration():
    if request.method == "GET":
        return render_template('calibrationPage.html')
    if request.method == "POST":
        # check if the post request has the file part
        if 'file' not in request.files:
            return redirect(url_for("home"))
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            return redirect(url_for("home"))
        if file and allowed_file(file.filename):
            file.filename = "upload." + file.filename.rsplit('.',1)[1]
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return render_template('calibrationPage.html')
    return render_template('calibrationPage.html')
    
@app.route('/file', methods=['GET'])
def file():
    return send_from_directory(app.config['UPLOAD_FOLDER'], 'upload.pdf')

@app.route('/reading', methods=['GET', 'POST'])
def reading():
    return render_template('readingPage.html')

if __name__ == "__main__":
    app.run()
