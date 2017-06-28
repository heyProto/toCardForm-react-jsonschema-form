module.exports = {
  schema: {
          "title": "User Data",
          "id": "/properties/data/properties/cover_data",
          "properties": {
            "logo_image": {
              "title": "Logo image",
              "type": "object",
              "properties": {
                "image": {
                  "type": "string",
                  "format": "data-url",
                  "id": "/properties/data/properties/cover_data/properties/logo_image",
                  "title": "Upload an image",
                  "description": "An explanation about the purpose of this instance."
                }
              }
            },
            "cover_title": {
              "type": "string",
              "title": "Cover title",
              "description": "An explanation about the purpose of this instance.",
              "default": "Feature",
              "id": "/properties/data/properties/cover_data/properties/cover_title"
            },
            "fb_image": {
              "type": "object",
              "title": "Facebook / Twitter cover image",
              "properties": {
                "image": {
                  "title": "Upload an image",
                  "type": "image",
                  "ratio": "2/1",
                  "id": "/properties/data/properties/fb_image",
                  "description": "An explanation about the purpose of this instance."
                }
              }
            },
            "instagram_image": {
              "title": "Instagram cover image",
              "type": "object",
              "properties": {
                "image": {
                  "title": "Upload an image",
                  "type": "image",
                  "ratio": "1/1",
                  "id": "/properties/data/properties/instagram_image",
                  "description": "An explanation about the purpose of this instance."
                }
              }
            }
          },
          "required": [
            "cover_title",
            "logo_image"
          ],
          "type": "object"
  },
  uiSchema: {},
  formData: {
    "logo_image": {
      "image":"www.google.com"
    }
  },
};
