import os
from flask import Flask, Blueprint, render_template, request, redirect, url_for, make_response, send_from_directory

esp_blueprints = Blueprint('esp32', __name__)
# esp_blueprints = Blueprint('esp32', __name__, template_folder= 'templates/esp32')

@esp_blueprints.route('/setdata', methods=['GET', 'POST'])
def esp_set_data():
    print("Content-Type:", request.headers.get('Content-Type'))
    print("Json:", request.get_json())
    data = request.get_json()
    print(data)
    return "OK"

@esp_blueprints.route('/form', methods=['GET', 'POST'])
def esp_form():
    print("Content-Type:", request.headers.get('Content-Type'))
    user = request.form.get('user')
    print("user", user)
    print("data", request.data)
    return "OK"
