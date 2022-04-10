from flask import render_template, redirect, request, url_for
from flask import Flask

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def start():
    return redirect(url_for("home"))


@app.route('/home', methods=['GET', 'POST'])
def home():
    return render_template('startPage.html')

@app.route('/calibration', methods=['GET'])
def calibration():
    return render_template('calibrationPage.html')

@app.route('/reading', methods=['GET'])
def reading():
    return render_template('readingPage.html')

if __name__ == "__main__":
    app.run()
