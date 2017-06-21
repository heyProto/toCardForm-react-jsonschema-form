import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';

export default class CropperWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      cropResult: null,
      url:null
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChangeURL = this.onChangeURL.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
  }

  onChangeFile(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }
  
  onChangeURL = ({ target: { value } }) => {
    this.setState({
        url:value
    });
    return this.props.onch(value);
  }
  
  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    const data = this.cropper.getCroppedCanvas().toDataURL();
    this.setState({
      cropResult: data,
    });
    this.props.onch(data);
  }
  loadImage( src ){
    this.setState({
        src:src,
        cropResult:null
    });
  }
  deleteImage( src ){
    this.setState({
        src:null
    });
  }
  render() {
    if(this.props.utype === "url"){
       if(this.state.src === null){
          return (
              <div>
                  <div className = "check" style={{ width: '100%' }}>
                  <input type="url" onChange={this.onChangeURL} />
                  <br />
                  <br />
                  <button onClick={()=>{this.loadImage(this.state.url)}} className = "btn">
                      Load Image
                  </button>
                  </div>
              </div>
          );
      }
      return (
        <div>
          <div className = "check" style={{ width: '100%' }}>
            <input type="url" onChange={this.onChangeURL} />
            <br/>
            <br/>
            <button onClick={()=>{this.loadImage(this.state.url)}} className = "btn">
              Load Image
            </button>
            <br />
            <br />
            <Cropper
              checkCrossOrigin={true}
              style={{ height: 200, width: '50%' }}
              preview=".img-preview"
              aspectRatio = {eval(this.props.ratio)}
              guides={true}
              movable = {true}
              src={this.state.src}
              ref={cropper => { this.cropper = cropper; }}
            />
          </div>
          <div>
            <div className="box" style={{ width: '50%'}}>
              <h1>
                <button onClick={this.cropImage} className = "btn">
                  Crop Image
                </button>
              </h1>
              <img style={{ width: '100%' }} src={this.state.cropResult} crossOrigin = "gaurav" alt="cropped image" />
            </div>
          </div>
          <br style={{ clear: 'both' }} />
        </div>
      );
    }else{
      if(this.state.src === null){
      return (
        <div>
          <div className = "check" style={{ width: '100%' }}>
            <input type="file" onChange={this.onChangeFile} />
            <br />
            <br />
          </div>
      </div>
          );
      }
      return (
        <div>
          <div className = "check" style={{ width: '100%' }}>
            <input type="file" onChange={this.onChangeFile} />
            <br />
            <br />
            <Cropper
              style={{ height: 200, width: '50%' }}
              preview=".img-preview"
              aspectRatio = {eval(this.props.ratio)}
              guides={true}
              movable = {true}
              src={this.state.src}
              ref={cropper => { this.cropper = cropper; }}
            />
          </div>
          <div>
            <div className="box" style={{ width: '50%'}}>
              <h1>
                <button onClick={this.cropImage} className = "btn">
                  Crop Image
                </button>
              </h1>
              <img style={{ width: '100%' }} src={this.state.cropResult} alt="cropped image" />
            </div>
          </div>
          <br style={{ clear: 'both' }} />
        </div>
      );
    }
  }
}
