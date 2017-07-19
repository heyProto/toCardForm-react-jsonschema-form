import React from "react";
import PropTypes from "prop-types";

function SubTitleField(props) {
  const { id, subTitle, required } = props;
  return <p className='form-hint' id={id}>{subTitle}</p>;
}

if (process.env.NODE_ENV !== "production") {
  SubTitleField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool,
  };
}

export default SubTitleField;
