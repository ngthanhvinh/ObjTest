from flask import Flask, request, jsonify
from flask_cors import CORS
from classifier import *

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def handler():
    if request.method != 'POST':
        # Error 405 Method Not Allowed
        return 405
    try:
        file = request.files['file']
    except:
        file = None
    print(file)
    predict = classifier(file)
    return jsonify(predict=predict), 200

if __name__ == "__main__":
    app.run()