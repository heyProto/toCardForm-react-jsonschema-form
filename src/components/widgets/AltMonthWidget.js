import React from "react";
import PropTypes from "prop-types";

function AltMonthWidget(props) {
  const { AltYearWidget } = props.registry.widgets;
  return <AltYearWidget month {...props} />;
}

if (process.env.NODE_ENV !== "production") {
  AltMonthWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default AltMonthWidget;
