module.exports = {
  schema: {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "definitions": {},
    "id": "http://example.com/example.json",
    "properties": {
"questions": {
                    "id": "/properties/data/properties/questions",
                    "title": "Questions",
                    "items": {
                        "id": "/properties/data/properties/questions/items",
                        "properties": {
                            "question": {
                                "default": "This is a sample question?",
                                "title": "Question",
                                "id": "/properties/data/properties/questions/items/properties/question",
                                "type": "string"
                            },
                            "options": {
                                "title": "Answers",
                                "id": "/properties/data/properties/questions/items/properties/options",
                                "items": {
                                    "id": "/properties/data/properties/questions/items/properties/options/items",
                                    "properties": {
                                        "fact": {
                                            "id": "/properties/data/properties/questions/items/properties/options/items/properties/fact",
                                            "type": "string",
                                            "title": "Educative Text"
                                        },
                                        "gif_image": {
                                            "id": "/properties/data/properties/questions/items/properties/options/items/properties/gif_image",
                                            "type": "object",
                                            "title": "",
                                            "properties": {
                                                "image": {
                                                    "id": "/properties/data/properties/cover_data/properties/logo_image",
                                                    "title": "Add an educative image",
                                                    "type": "string",
                                                    "format": "data-url"
                                                }
                                            },
                                            "condition": { "element": "quiz_type", "value": "scoring" }
                                        },
                                        "option": {
                                            "default": "Answer Text",
                                            "title": "Answer Text",
                                            "id": "/properties/data/properties/questions/items/properties/options/items/properties/option",
                                            "type": "string"
                                        },
                                        "right_or_wrong": {
                                            "default": true,
                                            "title": "Is this question right?",
                                            "id": "/properties/data/properties/questions/items/properties/options/items/properties/right_or_wrong",
                                            "type": "boolean",
                                            "condition": { "element": "quiz_type", "value": "scoring" }
                                        }
                                    },
                                    "required": [
                                        "option"
                                    ],
                                    "minItems" : 1,
                                    "addButtonText": "Add a new option",
                                    "type": "object"
                                },
                                "minItems" : 1,
                                "type": "array"
                            }
                        },
                        "required": [
                            "question",
                            "options"
                        ],
                        "minItems" : 1,
                        "addButtonText": "Add a new question",
                        "type": "object"
                    },
                    "minItems" : 1,
                    "type": "array"
                }
    },
    "type": "object"
  },
  uiSchema: {
    "items": {
      "options": {
        "items": {
          "right_or_wrong": {
            "ui:widget": "radio"
          }
        }
      }
    },
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
      "questions": [
      {
        "question":"When you go to a doctor with a headache, backache or other small problems, how does he examine you?",
        "options":[
          {
            "option":"Gives time",
            "gif_image": {
              "image": "https://storage.googleapis.com/g2gcs-hosting-quizjs-v2-148d020fd5/src/images/IndianDoctor.png"
            },
            "fact":"In general, the doctor gives medicine on hearing the problem. Instead the doctor should give time to the patient, since the beginning of many big diseases is very small ailments.",
            "right_or_wrong":true
          },
          {
            "option":"Does not give time",
            "gif_image": {
              "image": "https://storage.googleapis.com/g2gcs-hosting-quizjs-v2-148d020fd5/src/images/IndianDoctor.png"
            },
            "fact":"In general, the doctor gives medicine on hearing the problem. Instead the doctor should give time to the patient, since the beginning of many big diseases is very small ailments.",
            "right_or_wrong":false
          }
        ]
      }
    ]
    }
};
