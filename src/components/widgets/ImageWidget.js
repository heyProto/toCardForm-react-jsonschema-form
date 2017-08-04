import React, { Component } from "react";
import PropTypes from "prop-types";
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import Modal from 'react-modal';
import { shouldRender } from "../../utils";

class ImageWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      cropResult: null,
      url:null,
      showModal:false,
      zoom: 0.2,
      fileSizeError: undefined,
      fileInfo: undefined,
      srcStore: null
    };
    this.cropModal = this.cropModal.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.zoom = this.zoom.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  handleOpenModal () {
    this.setState({
      showModal: true
    });
  }

  handleCloseModal () {
    let state = {
      src: this.state.srcStore,
      showModal: false,
      fileSizeError: undefined
    };

    if (!this.state.srcStore) {
      state.fileInfo = undefined;
      state.fileName = undefined;
      state.fileSize = undefined;
      state.fileType = undefined;
    }

    this.setState(state);
  }

  displayFilesInfo() {
    return (
      <div className="file-info">
        <p style = {{ color: "#333", fontSize: "0.8em" }}>
          <strong>{this.state.fileName}</strong> ({this.state.fileType}, {this.state.fileSize} bytes)
        </p>
      </div>
    );
  }

  onChangeFile(e) {
    e.preventDefault();
    let file,
      sizeLimit = this.props.schema.sizeLimit || 500;
    if (e.dataTransfer) {
      file = e.dataTransfer.files[0];
    } else if (e.target) {
      file = e.target.files[0];
    }

    if ((file.size/1000) <= sizeLimit) {
      this.setState({
        fileSizeError: undefined,
        fileInfo: true,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        src: null,
        zoom:0.2
      });
    } else {
      this.setState({
        fileSizeError: true,
        src: null,
        zoom:0.2
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      this.setState({
        src: reader.result,
        cropResult: null
      });
    };
    reader.readAsDataURL(file);
  }

  cropModal(){
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    const data = this.cropper.getCroppedCanvas().toDataURL();
    this.props.onChange(data);
    this.setState({
      srcStore: this.state.src,
      showModal: false
    });
  }
  chooseFile(){
    var file = document.getElementById('file');
    file.click();
  }

  ratioReturn( fraction ){
    var bits = fraction.split("/");
    return parseInt(bits[0],10)/parseInt(bits[1],10);
  }

  zoom() {
    var zoom = document.getElementById("zoom");
    if (zoom) {
      var value = zoom.value;
      this.setState({
        zoom: +value
      });
    }
  }

  render() {
      let sizeLimit = this.props.schema.sizeLimit || 500;
    return (
      <div>
        <p>
          <button type = "button" onClick={this.handleOpenModal} className = "default-button">Upload an Image</button>
        </p>
        {
          this.state.fileInfo &&
            this.displayFilesInfo()
        }
        <Modal style={{overlay: {
          width: "600px",
          height:"500px",
          padding: "15px",
          position:"absolute",
          left:"50%",
          top:"50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid #efefef",
          boxShadow: "0px 10px 20px #efefef",
          borderRadius: "4px",
          display: "inline-block",
          zIndex: 1000},
          content: {
            margin:"-40px"
          }}}
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
        >
          <div style = {{position:"absolute",right:"1px",top:"7px"}}>
            <button className="ui icon button"  onClick={this.handleCloseModal} style = {{ backgroundColor:"white"}}>
              <i className ="remove icon" style = {{ color:"#aaa",fontSize:"20px"}}></i>
            </button>
          </div>
          <div className = "modal-title">
            {this.props.schema.title}
          </div>
          <div className="form-group form-col-4" style={{"width": "100%"}}>
            <label className = "form-lable-hint" style={{"display": "block"}}>Upload from Computer</label>
            <input type="file" id="file" name="file" style={{ display: 'none'}} onChange={this.onChangeFile} multiple={false}/>
            <button
              type="button"
              htmlFor="file"
              style={{padding:"9px 12px"}}
              className="default-button"
              onClick={this.chooseFile}
              style={{"display": "block"}}
            >
              {this.state.src ? 'Change the Image' : 'Choose an Image'}
            </button>
            {
              this.state.fileSizeError ?
                <div className="error-detail bs-callout bs-callout-info">
                  <p className="form-error-message">{`Image size cannot be more than ${sizeLimit}kB.`}</p>
                </div>
              :
                <span className="form-lable-hint">{`Hint: Image size cannot be more than ${sizeLimit}kB.`}</span>
            }
          </div>
          <div className="form-clearfix"></div>
          {
            this.state.src ?
              <div className="form-col-12">
                <div className="image-crop-area">
                  <Cropper
                    cropBoxResizable={false}
                    toggleDragModeOnDblclick={false}
                    dragMode='move'
                    cropBoxMovable = {false}
                    zoomOnWheel={true}
                    zoomOnTouch={false}
                    viewMode={1}
                    background={false}
                    modal={true}
                    style={{ height: 300, width: '100%' }}
                    preview=".img-preview"
                    aspectRatio={this.ratioReturn(this.props.schema.ratio)}
                    guides={false}
                    movable = {true}
                    src={this.state.src}
                    ref={cropper => { this.cropper = cropper; }}
                    zoomTo={ +this.state.zoom }
                  />
                  <div>
                    <div style={{ marginTop:"8px"}}>
                      <input
                        type="range"
                        min="0"
                        max="1.75"
                        step="0.05"
                        value={ +this.state.zoom}
                        onChange={this.zoom}
                        id="zoom"
                        style={{width:"100%"}}
                      />
                    </div>
                    <i style={{ fontSize:"10px", float: "left", "paddingBottom": "5px", "paddingLeft": "5px"}} className="image icon"></i>
                    <i className ="image icon" style={{ fontSize:"17px", float: "right", "paddingBottom": "5px", "paddingRight": "5px"}}></i>
                    <div style={{"clear": "both"}} />
                  </div>
                </div>
                <button
                  type="button"
                  style={{"float": "right"}}
                  className="default-button primary-button"
                  onClick={this.cropModal}
                >
                  Upload
                </button>
                <div style={{"clear": "both"}} />
              </div>
            :
              <div className="form-col-12">
                <div className="image-crop-area" style={{textAlign:"center"}}>
                  <i className ="image icon" style = {{ position:"relative",top: "135px",color:"rgb(210, 210, 210)",fontSize:"50px"}}></i>
                </div>
              </div>
          }
        </Modal>
      </div>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  ImageWidget.propTypes = {
    multiple: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    autofocus: PropTypes.bool,
  };
}

export default ImageWidget;
