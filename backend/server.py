from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from werkzeug import secure_filename
import datetime

'''
	VGG16 model
'''
import tensorflow as tf
from tensorflow import keras

from keras.applications.vgg16 import VGG16
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.applications.vgg16 import preprocess_input
from keras.applications.vgg16 import decode_predictions

model = VGG16()
graph = tf.get_default_graph()

def classifier(img_file):
	image = load_img(img_file, target_size=(224, 224))
	image = img_to_array(image)  # numpy-array

	image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))

	image = preprocess_input(image)
	
	with graph.as_default():
		yhat = model.predict(image)
	
	label = decode_predictions(yhat)
	
	# take 5 best predictions
	label = label[0][0:5]

	# return a list of tuples (name_of_object, probability_of_object)
	names = []
	probs = []
	for item in label:
		names.append(item[1]) 
		probs.append(item[2] * 100)

	return names, probs

# =================================
'''
	Flask app
'''
app = Flask(__name__)
CORS(app)
UPLOAD_DIR = os.getcwd() + '/img'
HOST='0.0.0.0'

# Welcome!
@app.route("/")
def access():
	return "Welcome to ObjTest API!", 200

# Handle uploads
@app.route('/upload', methods=['POST'])
def handler():
    if request.method != 'POST':
        # Error 405 Method Not Allowed
        return 405
    
    format = "%Y-%m-%dT%H:%M:%S"
    now = datetime.datetime.utcnow().strftime(format)
    
    img_file = request.files['file']
    
    # create a new unique file name
    filename = now + '_' + img_file.filename
    filename = secure_filename(filename)
    
    # save the image
    path = os.path.join(UPLOAD_DIR, filename)
    img_file.save(path)

    # get the predictions from the classifier
    names, probs = classifier(path)
    
    # delete the file after processing to save the memory
    os.remove(path)
    return jsonify(names=names, probs=probs), 200


# HTTP Errors handlers
@app.errorhandler(404)
def url_error(e):
    return """
    Wrong URL!
    <pre>{}</pre>""".format(e), 404

@app.errorhandler(500)
def server_error(e):
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

if __name__ == "__main__":
    app.run(host=HOST, debug=True)
