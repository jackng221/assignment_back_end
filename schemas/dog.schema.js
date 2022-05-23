module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/dog",
  "title": "Dog",
  "description": "A dog entry stored in the system",
  "type": "object",
  "properties": {
    "name": {
      "description": "Name of the dog",
      "type": "string"
    },
    "age": {
      "description": "Age of the dog",
      "type": "number",
      "minimum": 0
    },
    "weight": {
      "description": "Weight of the dog",
      "type": "number",
      "minimum": 0
    },
    "sex": {
      "description": "Sex of the dog",
      "type": "string"
    },
    "breed": {
      "description": "Breed of the dog",
      "type": "string"
    },
    "location": {
      "description": "Current facility location the dog is in",
      "type": "string"
    },
    "imageurl":{
      "description": "URL of the dog image",
      "type": "uri"
    }
  },
  "required": ["name", "age", "weight", "sex", "breed", "location"]
}
