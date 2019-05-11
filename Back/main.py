import requests
from pymongo import MongoClient
from flask import Flask, jsonify, request
from bson.json_util import dumps
import json

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/")
db = client["rirc-database"]

inventory = db.inventory

@app.route('/add-item')
def add_item():
    item = request.args.get("item")

    name = item.split(",")[0]
    amount = item.split(",")[1]

    inventory.insert_one({
        "name": name,
        "amount": amount,
        "image1": "https://spoonacular.com/cdn/ingredients_500x500/" + name + ".jpg",
        "image2": "https://spoonacular.com/cdn/ingredients_500x500/" + name + "s.jpg"
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

@app.route('/recipes')
def hello_world():
    response = jsonify(requests.get(
          "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=apples%2Cflour%2Csugar",
          headers={'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                   'X-RapidAPI-Key': '71514d66edmshcc790e119430cc2p1adc6ejsn0ce22b1c10fa'}
    ).json())
    return response

@app.route('/missing-items-recipes')
def missing_items_recipes():
    items = inventory.find()
    json_items = json.loads(dumps(items))

    response = requests.get(
          "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=apples%2Cflour%2Csugar",
          headers={'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                   'X-RapidAPI-Key': '71514d66edmshcc790e119430cc2p1adc6ejsn0ce22b1c10fa'}
    ).json()

    objects = []
    for object in response:
        if object["missedIngredientCount"] > 0:
            objects.append(object)

    return jsonify(objects)
