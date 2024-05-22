import json
from pymongo import MongoClient
from bson import ObjectId
import os

# MongoDB connection string
mongo_uri = "mongodb://localhost:27017/"
client = MongoClient(mongo_uri)
db = client["company_website"]

# List of JSON files to update the database
json_files = [
    'data/company_website.Divisions.json',
    'data/company_website.services.json',
    'data/company_website.team.json',
    'data/company_website.testimonials.json',
    'data/Contact.json',
]

# Function to update database from JSON data
def update_collection(collection_name, data):
    collection = db[collection_name]
    for item in data:
        # Convert "_id" to ObjectId if present
        if "_id" in item and "$oid" in item["_id"]:
            item["_id"] = ObjectId(item["_id"]["$oid"])
        query = {"_id": item["_id"]}
        update = {"$set": item}
        collection.update_one(query, update, upsert=True)

# Iterate over each JSON file and update the corresponding collection
for json_file in json_files:
    # Extract collection name from file name
    collection_name = os.path.basename(json_file).split('.')[1]
    # Load JSON data from file
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)
    # Update database
    update_collection(collection_name, data)

print("Database updated successfully!")
