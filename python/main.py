import os
from flask import Flask, Blueprint, render_template, request, redirect, url_for, make_response, send_from_directory  
from flask_socketio import SocketIO, emit  
from esp32.view import esp_blueprints, dnt11_now_data  
import asyncio  

app = Flask(__name__)  
app.register_blueprint(esp_blueprints, url_prefix='/esp32')  

socketio = SocketIO(app, cors_allowed_origins='*')

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route("/login/set", methods=['POST'])
def set_cookie():
    print("Content-Type:", request.headers.get('Content-Type'))
    print("Json:", request.get_json())
    data = request.get_json()
    value = data['token']
    resp = make_response("OK")
    resp.set_cookie(key='token', value=value)
    return resp

@app.route('/login/get', methods=['POST'])
def get_cookie():
    res = make_response('OK')
    token = request.cookies.get('token')
    print("token:", token)

    if token is None:
        res = make_response('error')
    else:
        res = make_response('OK')

    return res

@app.route('/login/del', methods=['POST'])
def del_cookie():
    res = make_response('OK')
    res.set_cookie(key='token', value='', expires=0)
    return res

@app.errorhandler(404)
def not_found(e):
    return render_template("notFound.html")

@socketio.on('dht11_now_data')
def dht11_now_data(data):
    print(data)
    socketio.emit("dht11_now_data",  "testdata")

if __name__ == "__main__":
    print("flask start.")
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
