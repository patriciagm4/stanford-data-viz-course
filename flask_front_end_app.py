import os, copy, json, collections
from flask import Flask, jsonify, request, send_from_directory, url_for, redirect, make_response
from flask.ext.cors import CORS
from flask.ext import assets
app = Flask(__name__, static_url_path='')

# get root
@app.route("/")
def index():
    return app.make_response(open('app/index.html').read())

@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory('app/assets/', path)

@app.route('/api/v1.0/data/iris/', methods=['GET'])
def get_iris_data():
	with open('app/assets/data/iris.json') as data_file:
		return json.dumps(json.load(data_file))

@app.route('/api/v1.0/data/c3_data/', methods=['GET'])
def get_c3_data():
	with open('app/assets/data/c3_data.json') as data_file:
		return json.dumps(json.load(data_file))



if __name__ == "__main__":
	port = int(os.environ.get("PORT", 5050))
	app.run(host='0.0.0.0', port=port, debug=False) # set debug=True if you want to have auto-reload on changes
# this is great for developing