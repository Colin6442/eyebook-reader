from flask import render_template, redirect, request, url_for
from flask import Flask

app = Flask(__name__)

@app.route('/', methods=['GET'])
def start():
    return redirect(url_for("home"))


@app.route('/home', methods=['GET', 'POST'])
def home():
    return render_template('startPage.html')

@app.route('/calibration', methods=['GET', 'POST'])
def calibration():
    if request.method == "GET":
        # print("GETTED")
        return render_template('calibrationPage.html')
    if request.method == "POST":
        # print("POSTED")
        return render_template('calibrationPage.html')
    
    

@app.route('/reading', methods=['GET', 'POST'])
def reading():
    return render_template('readingPage.html')

if __name__ == "__main__":
    app.run()
