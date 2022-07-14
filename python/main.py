import os
from flask import Flask, Blueprint, render_template
from esp32.view import esp_blueprints

app = Flask(__name__)
app.register_blueprint(esp_blueprints, url_prefix='/esp32')

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/home2')
def home2():
    return render_template('home2.html')

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
