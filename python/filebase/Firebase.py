import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from datetime import datetime

class Firebase:
    def __init__(self):
        cred = credentials.Certificate('serviceAccount.json')
        firebase_admin.initialize_app(cred)

        self.db = firestore.client()
    
    def set_dht11_data(self):
        today = date.today()

        # Y-m-d
        now = datetime.now()
        dt_string = now.strftime("%Y-%m-%d-%H-%M")

        doc_ref = self.db.collection('DHT11').document(dt_string)
        doc_ref.set({
            '1': {
                'Hum': 59,
                'Temp': 20
            },
            '2': {
                'Hum': 59,
                'Temp': 20
            },
            '3': {
                'Hum': 59,
                'Temp': 20
            },
            '4': {
                'Hum': 59,
                'Temp': 20
            },
            '5': {
                'Hum': 59,
                'Temp': 20
            }
        })


    def get_dht11_data(self):
        users_ref = self.db.collection(u'Users')
        docs = users_ref.stream()

        for doc in docs:
            print(f'{doc.id} => {doc.to_dict()}')