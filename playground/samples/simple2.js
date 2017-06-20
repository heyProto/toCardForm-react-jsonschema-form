module.exports = {
  schema: {
      "title": "Common Configs",
      "description": "Enter common configurations here:",
      "type": "object",
      "properties": {
        "language": {
          "type": "string",
          "title": "Language",
          "enum": [
            "English",
            "Hindi"
          ],
          "default": "English"
        },
        "qmode": {
          "type": "string",
          "title": "Quiz Mode",
          "enum": [
            "General",
            "Scoring"
          ],
          "default": "General"
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
          "type": "number",
          "title": "Time Per Question",
          "enum": [
            30,
            60,
            90
          ],
          "default": 30
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
          "title": "Revisit Answers",
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
      }
    },
  formData: {{
      "language": "English",
      "qmode": "General",
      "timer": true,
      "tpq": 30,
      "fcard": true,
      "revans": true,
      "socsha": true,
      "shalin": "https://pykih.com",
      "shames": "I found this quiz really informative. Would you like to try it?"
    },
};
