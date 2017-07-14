import React from "react";
import PropTypes from "prop-types";

function AltDateTimeWidget(props) {
  const { AltYearWidget } = props.registry.widgets;
  return <AltYearWidget month day time {...props} />;
}

if (process.env.NODE_ENV !== "production") {
  AltDateTimeWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default AltDateTimeWidget;
