import tensorflow
from tensorflow import keras

from keras.applications.vgg16 import VGG16
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.applications.vgg16 import preprocess_input
from keras.applications.vgg16 import decode_predictions

model = VGG16()

def classifier(img_file):
	image = load_img(img_file, target_size=(224, 224))
	image = img_to_array(image)  # numpy-array

	image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))

	image = preprocess_input(image)
	yhat = model.predict(image)

	label = decode_predictions(yhat)
	
	# take 5 best predictions
	label = label[0][0:5]

	# return a list of tuples (name_of_object, probability_of_object)
	predict = []
	for item in label:
		predict.append( (item[1], item[2]) )
	print(predict)

	return predict
