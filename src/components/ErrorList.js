import React from "react";

export default function ErrorList(props) {
  const { errors } = props;
  console.log(props);
  return (
    <div className="panel panel-danger errors">
      <div className="panel-heading">
        <h3 className="panel-title">Errors</h3>
      </div>
      <ul className="list-group">
        {errors.map((error, i) => {
          return (
            <li key={i} className="form-error-message">
              {error.stack}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
