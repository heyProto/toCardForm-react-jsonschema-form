module.exports = {
  schema: {
  "title": "Files",
  "type": "object",
  "properties": {
    "image": {
      "title": "Upload an Image: ",
      "type": "string",
      "ratio": "2/1",
      "format":"image"
    },
    "color": {
      "title": "Choose a color: ",
      "type": "string",
      "format":"color"
    },
    "textarea": {
      "title": "Description: ",
      "type": "string",
      "format":"textarea"
    }
  }
},
  uiSchema: {},
  formData: {},
};
