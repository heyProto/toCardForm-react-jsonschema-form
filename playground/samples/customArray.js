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

module.exports = {
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
};
