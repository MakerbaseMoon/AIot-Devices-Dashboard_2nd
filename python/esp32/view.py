from flask import Blueprint

esp_blueprints = Blueprint('esp32', __name__)
# esp_blueprints = Blueprint('esp32', __name__, template_folder= 'templates/esp32')

@esp_blueprints.route('/setdata', methods=['GET','POST'])
def esp_set_data():
    return "OK"
