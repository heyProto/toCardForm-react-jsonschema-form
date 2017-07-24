import React from "react";
import PropTypes from "prop-types";
import DescriptionField from "../fields/DescriptionField.js";

function ToggleWidget(props) {
  const {
    schema,
    id,
    value,
    required,
    disabled,
    readonly,
    label,
    autofocus,
    onChange,
  } = props;

  return (
    <div className={`ui toggle checkbox ${disabled || readonly ? "disabled" : ""}`}>
      {schema.description &&
        <DescriptionField description={schema.description} />}
      <input
        type="checkbox"
        id={id}
        checked={typeof value === "undefined" ? false : value}
        required={required}
        disabled={disabled || readonly}
        autoFocus={autofocus}
        onChange={event => onChange(event.target.checked)}
      />
      <label></label>
    </div>
  );
}

ToggleWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  ToggleWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default ToggleWidget;
