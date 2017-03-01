#!/usr/bin/python
#import demo_prediction
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import sys
import subprocess
import config

PORT_NUMBER = config.port_number

def parse_output(output_path):
	f = open(output_path,'r')
	pred_labels = []
	for line in f:
		pred_label = line.split()[2]
		pred_labels.append(pred_label)
	return " ".join(pred_labels)

def handle_opinion(self, question):
	script_dir = config.paths['opinion_target'] + 'run_demo.py'
	predict_dir = config.paths['opinion_target'] + 'predictions.txt'
	subprocess.call(['python', script_dir, '--sentence', '"'+ question + '"'])
	answer = parse_output(predict_dir)
	print("Question received for Opinion Target project", answer)
	self.wfile.write(bytes(answer, "utf8"))

def handle_chatbot(self, question):
	predict_dir = config.paths['chatbot']
	model_dir = config.paths['chatbot'] + 'runs/1486584016'
	subprocess.call(['python', predict_dir + 'demo_prediction.py', '--model_dir=' + model_dir, '--raw_query=' + "'" + question + "'"])
	answer = ''
	with open(predict_dir + "answers.txt", "r") as text_file:
		answer = text_file.readlines()
	self.wfile.write(bytes(answer[0], "utf8"))
 
# HTTPRequestHandler class
class testHTTPServer_RequestHandler(BaseHTTPRequestHandler):
	# GET
	def do_GET(self):
		# Send response status code
		self.send_response(200)

		# Send headers
		self.send_header('Content-type','text/html')
		self.end_headers()
		# Write content as utf-8 data
		self.wfile.write(bytes(message, "utf8"))
		return

	def do_POST(self):
		# Send the html message
		print("POST request to URL " + self.path)
		question = self.rfile.read(int(self.headers['Content-Length'])).decode("utf-8") 
		print(question)
		self.send_response(200)
		self.send_header('Content-type','text/html')
		self.end_headers()
		if self.path == '/chatbot':
			handle_chatbot(self, question)
		else:
			handle_opinion(self, question)
		return

def run():
	print('Starting server...')

	# Server settings
	# Choose port 8080, for port 80, which is normally used for a http server, you need root access
	server_address = ('127.0.0.1', PORT_NUMBER)
	httpd = HTTPServer(server_address, testHTTPServer_RequestHandler)
	print('Server running in port ' + str(PORT_NUMBER))
	httpd.serve_forever()
run()


