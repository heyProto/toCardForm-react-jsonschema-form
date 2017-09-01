module.exports = {
  schema: {
   "type":"object",
   "properties":{
    "test":{
      "type": "string",
    "title": "test",
    "enum":["Hello","Hi","There"],
    "default":"Hello"
    }
   } 
  
},
  uiSchema: {},
  "referenceFormData": {},
  "formData": {}
};
