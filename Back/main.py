import requests
from pymongo import MongoClient
from flask import Flask, jsonify, request
from bson.json_util import dumps

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/")
db = client["rirc-database"]

inventory = db.inventory

@app.route('/add-item')
def add_item():
    item = request.args.get("item")
    
    inventory.insert_one({
        "name": item
    })
    return "OK"

@app.route('/remove-item')
def remove_item():
    item = request.args.get("item")

    inventory.delete_many({
        "name": item
    })
    return "OK"

@app.route('/retrieve-items')
def retrieve_items():
    return dumps(inventory.find())
