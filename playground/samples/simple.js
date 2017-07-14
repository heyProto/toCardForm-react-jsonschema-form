module.exports = {
  schema: {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "definitions": {},
    "id": "http://example.com/example.json",
    "properties": {
      "background_image": {
          "id": "/properties/data/properties/basic_datapoints/properties/background_image",
          "type": "object",
          "properties": {
              "image": {
                  "description": "An explanation about the purpose of this instance.",
                  "id": "/properties/data/properties/cover_data/properties/logo_image",
                  "title": "Upload a background image",
                  "type": "string",
                  "format": "data-url"
              }
          }
      },
      "introduction": {
          "id": "/properties/data/properties/basic_datapoints/properties/introduction",
          "type": "string"
      },
      "quiz_title": {
          "id": "/properties/data/properties/basic_datapoints/properties/quiz_title",
          "type": "string"
      },
      "share_link": {
          "id": "/properties/data/properties/basic_datapoints/properties/share_link",
          "type": "string",
          "condition": {"element": "social_share", "value": true}
      },
      "share_msg": {
          "id": "/properties/data/properties/basic_datapoints/properties/share_msg",
          "type": "string",
          "condition": {"element": "social_share", "value": true}
      },
      "start_button_text": {
          "id": "/properties/data/properties/basic_datapoints/properties/start_button_text",
          "type": "string"
      }
    },
    "required": [
      "start_button_text",
      "quiz_title"
    ],
    "type": "object"
  },
  uiSchema: {

      "flip_card": {
        "ui:widget": "radio"
      },
      "revisit_answers": {
        "ui:widget": "radio"
      },
      "social_share": {
        "ui:widget": "radio"
      },
      "timer": {
        "ui:widget": "radio"
      }

  },
    "referenceFormData": {
      "language":"english",
      "quiz_type":"general",
      "timer":false,
      "time_per_question":10,
      "flip_card":false,
      "social_share":true,
      "revisit_answers": true
    },
    "formData": {
      "background_image": {
        "image": ""
      },
      "quiz_title":"How well do you really know what happens when you visit a doctor?",
      "introduction":"",
      "start_button_text":"Take our quiz",
      "share_link":"https://pykih.com",
      "share_msg":"I found this quiz really informative. Would you like to try it?"
    }
};
