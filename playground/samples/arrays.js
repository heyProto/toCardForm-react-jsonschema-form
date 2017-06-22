module.exports = {
  schema: {
  "type": "object",
  "properties": {
    "listOfStrings": {
      "type": "array",
      "title": "A list of strings",
      "items": {
        "type": "string",
        "default": "bazinga"
      }
    }
  }
},
  uiSchema: {},
  formData: {}
};
