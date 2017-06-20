import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
export default class CropperWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      cropResult: null,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
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

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
    this.props.onch(this.cropper.getCroppedCanvas().toDataURL());
  }

  render() {
    if(this.state.src === null){
    return (
      <div>
        <div className = "check" style={{ width: '100%' }}>
          <input type="file" onChange={this.onChange} />
          <br />
          <br />
        </div>
    </div>
        );
    }
    return (
      <div>
        <div className = "check" style={{ width: '100%' }}>
          <input type="file" onChange={this.onChange} />
          <br />
          <br />
          <Cropper
            style={{ height: 200, width: '50%' }}
            preview=".img-preview"
            aspectRatio = {eval(this.props.ratio)}
            guides={false}
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
