import React, { Component } from "react";
import PropTypes from "prop-types";

import { shouldRender, parseDateString, toDateString, pad } from "../../utils";

function rangeOptions(start, stop) {
  let options = [];
  for (let i = start; i <= stop; i++) {
    options.push({ value: i, label: pad(i, 2) });
  }
  return options;
}

function readyForChange(state) {
  return Object.keys(state).every(key => state[key] !== -1);
}

function DateElement(props) {
  const {
    type,
    range,
    value,
    select,
    rootId,
    disabled,
    readonly,
    autofocus,
    registry,
    onBlur,
  } = props;
  const id = rootId + "_" + type;
  const { SelectWidget } = registry.widgets;
  return (
    <SelectWidget
      schema={{ type: "integer" }}
      id={id}
      className="form-control"
      options={{ enumOptions: rangeOptions(range[0], range[1]) }}
      placeholder={type}
      value={value}
      disabled={disabled}
      readonly={readonly}
      autofocus={autofocus}
      onChange={value => select(type, value)}
      onBlur={onBlur}
    />
  );
}

class AltYearWidget extends Component {
  static defaultProps = {
    month: false,
    day: false,
    time: false,
    disabled: false,
    readonly: false,
    autofocus: false,
  };

  constructor(props) {
    super(props);
    this.state = parseDateString(props.value, props.month, props.day, props.time);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(parseDateString(nextProps.value, nextProps.month, nextProps.day, nextProps.time));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  onChange = (property, value) => {
    this.setState(
      { [property]: typeof value === "undefined" ? -1 : value },
      () => {
        // Only propagate to parent state if we have a complete date
        if (readyForChange(this.state)) {
          this.props.onChange(toDateString(this.state, this.props.month, this.props.day, this.props.time));
        }
      }
    );
  };

  setNow = event => {
    event.preventDefault();
    const { time, day, month, disabled, readonly, onChange } = this.props;
    if (disabled || readonly) {
      return;
    }
    const nowDateObj = parseDateString(new Date().toJSON(), month, day, time);
    this.setState(nowDateObj, () => onChange(toDateString(this.state, month, day, time)));
  };

  clear = event => {
    event.preventDefault();
    const { time, day, month, disabled, readonly, onChange } = this.props;
    if (disabled || readonly) {
      return;
    }
    this.setState(parseDateString("", month, day, time), () => onChange(undefined));
  };

  get dateElementProps() {
    const { month: includeMonth, day: includeDay, time } = this.props;
    const { year, month, day, hour, minute, second } = this.state;
    const data = [
      { type: "year", range: [1900, 2020], value: year }
    ];
    if (includeMonth) {
      data.push(
        { type: "month", range: [1, 12], value: month }
      );
    }
    if (includeDay) {
      data.push(
        { type: "day", range: [1, 31], value: day }
      );
    }
    if (time) {
      data.push(
        { type: "hour", range: [0, 23], value: hour },
        { type: "minute", range: [0, 59], value: minute },
        { type: "second", range: [0, 59], value: second }
      );
    }
    return data;
  }

  render() {
    const { id, disabled, readonly, autofocus, registry, onBlur } = this.props;
    return (
      <ul className="list-inline">
        {this.dateElementProps.map((elemProps, i) =>
          <li key={i}>
            <DateElement
              rootId={id}
              select={this.onChange}
              {...elemProps}
              disabled={disabled}
              readonly={readonly}
              registry={registry}
              onBlur={onBlur}
              autofocus={autofocus && i === 0}
            />
          </li>
        )}
        <li>
          <a href="#" className="btn btn-info btn-now" onClick={this.setNow}>
            Now
          </a>
        </li>
        <li>
          <a
            href="#"
            className="btn btn-warning btn-clear"
            onClick={this.clear}>
            Clear
          </a>
        </li>
      </ul>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  AltYearWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    month: PropTypes.bool,
    day: PropTypes.bool,
    time: PropTypes.bool
  };
}

export default AltYearWidget;
