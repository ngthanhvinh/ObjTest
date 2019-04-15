# ObjTest

**ObjTest** is a web app which can predict the object in images (with up to 1000 classes of object).

The app does not prioritize speed and design, it is just a fun and random experiment of mine regarding to the field of machine learning and web development. :laughing:

**Utilizing:** 
* [Flask](http://flask.pocoo.org/)
* [ReactJS](https://reactjs.org)
* [Bootstrap](https://getbootstrap.com/)
* [Tensorflow](https://tensorflow.org)
* [VGG16 pre-trained model with the ImageNet dataset](https://neurohive.io/en/popular-networks/vgg16/).

## Quick Overview

![Before predicting](image1.png)

![After predicting](image2.png)


## How to run the app locally?
First, clone this repository:

```bash
git clone https://github.com/ngthanhvinh2000/ObjTest
cd ObjTest
```

### Run Flask back-end

From the root, open a terminal window and run the following commands:

```bash
cd backend
pip install -r requirements.txt
python3 server.py
```

The back-end server is hosted at: [http://localhost:5000](http://localhost:5000).

### Run React front-end

From the root, open another terminal window and run the following commands:

```bash
cd frontend
npm install
npm start
```

Access [http://localhost:3000](http://localhost:3000) and enjoy the React app!

### Note
It may take some time to load...