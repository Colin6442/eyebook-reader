from flask import render_template, redirect, request, url_for
from flask import Flask

app = Flask(__name__)
# Our main page, which renders the full ucm map
@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('startPage.html')

@app.route('/reading', methods=['GET'])
def reading():
    return render_template('readingPage.html')

if __name__ == "__main__":
    app.run()
