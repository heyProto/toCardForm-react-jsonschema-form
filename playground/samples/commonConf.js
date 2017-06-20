module.exports = {
  schema: {
  "title": "Common Configs",
  "description": "Enter common configurations here:",
  "type": "object",
  "properties": {
    "language": {
      "type": "boolean",
      "title": "Language",
      "enumNames": [
        "English",
        "Hindi"
      ],
      "default": true
    },
    "qmode": {
      "type": "boolean",
      "title": "Quiz Mode",
      "enumNames": [
        "General",
        "Scoring"
      ],
      "default": true
    },
    "timer": {
      "type": "boolean",
      "title": "Timer",
      "enumNames": [
        "True",
        "False"
      ],
      "default": true
    },
    "tpq": {
      "title": "Integer range (by 10)",
      "type": "integer",
      "minimum": 10,
      "maximum": 60,
      "multipleOf": 10
    },
    "fcard": {
      "type": "boolean",
      "title": "Flipcard",
      "default": true,
      "enumNames": [
        "True",
        "False"
      ]
    },
    "revans": {
      "type": "boolean",
      "title": "Revisit Answers",
      "default": true,
      "enumNames": [
        "True",
        "False"
      ]
    },
    "socsha": {
      "type": "boolean",
      "title": "Social Share",
      "default": true,
      "enumNames": [
        "True",
        "False"
      ]
    },
    "shalin": {
      "type": "string",
      "title": "Share Link",
      "default": "https://pykih.com"
    },
    "shames": {
      "type": "string",
      "title": "Share Message",
      "default": "I found this quiz really informative. Would you like to try it?"
    }
  },
  "required": [
    "language",
    "qmode",
    "timer",
    "tpq",
    "fcard",
    "revans"
  ]
},
  uiSchema: {
  "language": {
    "ui:widget": "radio"
  },
  "qmode": {
    "ui:widget": "radio"
  },
  "fcard": {
    "ui:widget": "radio"
  },
  "timer": {
    "ui:widget": "radio"
  },
  "revans": {
    "ui:widget": "radio"
  },
  "socsha": {
    "ui:widget": "radio"
  },
  "tpq": {
    "ui:widget": "range"
  }
},
  formData: {
  "language": true,
  "qmode": true,
  "timer": true,
  "tpq": 40,
  "fcard": true,
  "revans": true,
  "socsha": true,
  "shalin": "https://pykih.com",
  "shames": "I found this quiz really informative. Would you like to try it?"
},
};
