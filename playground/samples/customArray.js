import React from "react";

function ArrayFieldTemplate(props) {
  return (
    <div className={props.className}>

      {props.items &&
        props.items.map(element =>
          <div key={element.index}>
            <div>{element.children}</div>
            {element.hasMoveDown &&
              <button
                onClick={element.onReorderClick(
                  element.index,
                  element.index + 1
                )}>
                Down
              </button>}
            {element.hasMoveUp &&
              <button
                onClick={element.onReorderClick(
                  element.index,
                  element.index - 1
                )}>
                Up
              </button>}
            <button onClick={element.onDropIndexClick(element.index)}>
              Delete
            </button>
            <hr />
          </div>
        )}

      {props.canAdd &&
        <div className="row">
          <p className="col-xs-3 col-xs-offset-9 array-item-add text-right">
            <button onClick={props.onAddClick} type="button">Custom +</button>
          </p>
        </div>}

    </div>
  );
}

/*module.exports = {
  schema: {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Product set",
  "type": "array",
  "items": {
    "title": "Product",
    "type": "object",
    "properties": {
      "id": {
        "description": "The unique identifier for a product",
        "type": "number"
      },
      "name": {
        "type": "string"
      },
      "price": {
        "type": "number",
        "minimum": 0,
        "exclusiveMinimum": true
      },
      "tags": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "minItems": 1,
        "uniqueItems": true
      },
      "dimensions": {
        "type": "object",
        "properties": {
          "length": {
            "type": "number"
          },
          "width": {
            "type": "number"
          },
          "height": {
            "type": "number"
          }
        },
        "required": [
          "length",
          "width",
          "height"
        ]
      },
      "warehouseLocation": {
        "description": "Coordinates of the warehouse with the product",
        "$url": "https://s3.ap-south-1.amazonaws.com/test.ss/geo"
      }
    },
    "required": [
      "id",
      "name",
      "price"
    ]
  }
},
  formData: [],
  ArrayFieldTemplate,
};*/
module.exports = {
  schema: {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "definitions": {},
  "id": "http://example.com/example.json",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "options": {
        "items": {
          "properties": {
            "answer_description": {
              "default": "",
              "description": "An explanation about the purpose of this instance.",
              "title": "The Answer_description Schema",
              "type": "string"
            },
            "fact": {
              "default": "In general, the doctor gives medicine on hearing the problem. Instead the doctor should give time to the patient, since the beginning of many big diseases is very small ailments.",
              "description": "An explanation about the purpose of this instance.",
              "title": "The Fact Schema",
              "type": "string"
            },
            "gif_image": {
              "default": "https://storage.googleapis.com/g2gcs-hosting-quizjs-v2-148d020fd5/src/images/IndianDoctor.png",
              "description": "An explanation about the purpose of this instance.",
              "title": "The Gif_image Schema",
              "type": "string"
            },
            "option": {
              "default": "Gives time",
              "description": "An explanation about the purpose of this instance.",
              "title": "The Option Schema",
              "type": "string"
            },
            "right_or_wrong": {
              "default": "right",
              "description": "An explanation about the purpose of this instance.",
              "title": "The Right_or_wrong Schema",
              "type": "string",
              "enum":[
                "right","wrong"
              ]
            }
          },
          "type": "object",
          
        },
        "minItems" : 1,
        "type": "array"
      },
      "question": {
        "default": "When you go to a doctor with a headache, backache or other small problems, how does he examine you?",
        "description": "An explanation about the purpose of this instance.",
        "title": "The Question Schema",
        "type": "string"
      },
      "question_no": {
        "default": 1,
        "description": "An explanation about the purpose of this instance.",
        "title": "The Question_no Schema",
        "type": "integer"
      }
    }
  }
},
  formData: [],
  ArrayFieldTemplate,
};

