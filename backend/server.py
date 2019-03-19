from http.server import HTTPServer, BaseHTTPRequestHandler
from io import BytesIO
from classifier import *

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'Welcome to port 8000!')

    def do_POST(self):
        # handle POST upload
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        self.send_response(200)
        self.end_headers()
        
        # get uploaded file from POST protocol
        img_file = body.files.file[0]
        # pass the image through the classifier
        predict = classifier(img_file)
        # response the predictions to the front-end
        response = BytesIO()
        response.write(predict)
        self.wfile.write(response.getvalue())

httpd = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)
print("Connecting to port 8000!")
httpd.serve_forever()