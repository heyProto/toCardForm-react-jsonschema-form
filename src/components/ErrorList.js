import React from "react";

export default function ErrorList(props) {
  const { errors } = props;
  return (
    <div className="panel panel-danger errors">
      <div className="panel-heading">
        <h3 className="panel-title">Errors</h3>
      </div>
      <div className="list-group">
        {errors.map((error, i) => {
          return (
            <p key={i} className="form-error-message">
              {error.stack}
            </p>
          );
        })}
      </div>
    </div>
  );
}
