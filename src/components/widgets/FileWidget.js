import React, { Component } from "react";
import PropTypes from "prop-types";

import { dataURItoBlob, shouldRender, setState } from "../../utils";

function addNameToDataURL(dataURL, name) {
  return dataURL.replace(";base64", `;name=${name};base64`);
}

function processFile(file) {
  const { name, size, type } = file;
  return new Promise((resolve, reject) => {
    if ((size/1000) >= 500.0) {
      reject({fileSizeError: true});
    }
    const reader = new window.FileReader();
    reader.onload = event => {
      resolve({
        dataURL: addNameToDataURL(event.target.result, name),
        name,
        size,
        type,
      });
    };
    reader.readAsDataURL(file);
  });
}

function processFiles(files) {
  return Promise.all([].map.call(files, processFile));
}

function FilesInfo(props) {
  const { filesInfo } = props;
  if (filesInfo.length === 0) {
    return null;
  }
  return (
    <div className="file-info">
      {filesInfo.map((fileInfo, key) => {
        if(fileInfo === "") return null;
        const { name, size, type } = fileInfo;
        return (
          <p style = {{ color: "#333", fontSize: "0.8em", marginTop:"15px" }} key={key}>
            <strong>{name}</strong> ({type}, {size} bytes)
          </p>
        );
      })}
    </div>
  );
}

function extractFileInfo(dataURLs) {
  return dataURLs
    .filter(dataURL => {
      var ret = (typeof dataURL !== "undefined");
      return ret;
    })
    .map(dataURL => {
    try{
      const { blob, name } = dataURItoBlob(dataURL);
      }catch(e){
        return "";
      }
      return {
        name: name,
        size: blob.size,
        type: blob.type,
      };
    });
}

class FileWidget extends Component {
  defaultProps = {
    multiple: false,
    fileSizeError: undefined
  };

  constructor(props) {
    super(props);
    const { value } = props;
    const values = Array.isArray(value) ? value : [value];
    this.state = { values, filesInfo: extractFileInfo(values) };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }
  chooseFile(e){
    var parent = e.target.parentNode;
    var file = parent.querySelector('#file2');
    file.click();
  }
  onChange = event => {
    const { multiple, onChange } = this.props;

    processFiles(event.target.files).then(filesInfo => {
      const state = {
        values: filesInfo.map(fileInfo => fileInfo.dataURL),
          filesInfo,
        };
        this.setState({fileSizeError: undefined});
        setState(this, state, () => {
          if (multiple) {
            onChange(state.values);
          } else {
            onChange(state.values[0]);
        }
      });
    }).catch(error => {
      console.log(error)
      if (error.fileSizeError) {
        this.setState({
          fileSizeError: true
        })
      }
    });
  };

  render() {
    const { multiple, id, readonly, disabled, autofocus } = this.props;
    const { filesInfo } = this.state;
    return (
      <div>
        <input
          ref={ref => (this.inputRef = ref)}
          id ="file2"
          style = {{display: "none"}}
          type="file"
          disabled={readonly || disabled}
          onChange={this.onChange}
          defaultValue=""
          autoFocus={autofocus}
          multiple={multiple}
        />
        <button
          type="button"
          htmlFor="file"
          style={{paddingTop:"9px 12px"}}
          className="default-button"
          onClick={this.chooseFile}
        >
          Upload an Image
        </button>
        <FilesInfo filesInfo={filesInfo} />
        {
          this.state.fileSizeError &&
            <div className="error-detail bs-callout bs-callout-info">
              <p className="form-error-message">Image size cannot be more than 500kB.</p>
            </div>
        }
      </div>
    );
  }
}

FileWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  FileWidget.propTypes = {
    multiple: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    autofocus: PropTypes.bool,
  };
}

export default FileWidget;
