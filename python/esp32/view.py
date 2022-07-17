import os
import asyncio

from flask import Flask, Blueprint, render_template, request, redirect, url_for, make_response, send_from_directory
from datetime import datetime, date

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

esp_blueprints = Blueprint('esp32', __name__)
# esp_blueprints = Blueprint('esp32', __name__, template_folder= 'templates/esp32')

cred = credentials.Certificate(os.path.dirname(os.path.abspath(__file__)) + '/serviceAccount.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

dht11_now_data = {
    'temp': None,
    'hum': None
    }

dht11_chart_data = {
    'temp': [],
    'hum': []
    }

@esp_blueprints.route('/setdata', methods=['GET', 'POST'])
async def esp_set_data():
    print()
    data = request.get_json()
    asyncio.create_task(set_firebase_data(data))
    print("return OK")
    return "OK"

@esp_blueprints.route('/getdata', methods=['GET', 'POST'])
def esp_get_data():
    doc = db.collection(u'DHT11')
    doc_ref = doc.document(u'2022-07-16-04')
    docs = doc_ref.get().to_dict()

    print(docs)

    if docs == None:
        return {"temp": None, "hum": None}
    return docs

@esp_blueprints.route('/form', methods=['GET', 'POST'])
def esp_form():
    print("Content-Type:", request.headers.get('Content-Type'))
    user = request.form.get('user')
    print("user", user)
    print("data", request.data)
    return "OK"

async def set_firebase_data(data):
    print("data:", data)

    dht11_now_data['temp'] = data['temp']
    dht11_now_data['hum'] = data['hum']
    
    dht11_chart_data['temp'].append(data['temp'])
    dht11_chart_data['hum'].append(data['hum'])

    print("dht11_chart_data:", dht11_chart_data)

    if len(dht11_chart_data['temp']) >= 6:
        print("update")
        now = datetime.now()
        doc = now.strftime("%Y-%m-%d-%H")
        minute = now.strftime("%M")

        doc_ref = db.collection(u'DHT11').document(doc)
        dht11_set_chart_data = {minute:{"temp":dht11_chart_data['temp'],"hum":dht11_chart_data['hum']}}

        if doc_ref.get().to_dict() == None:
            doc_ref.set(dht11_set_chart_data)
        else:
            doc_ref.update(dht11_set_chart_data)

        dht11_chart_data['temp'] = []
        dht11_chart_data['hum'] = []

        print("dht11_set_chart_data", dht11_set_chart_data)
