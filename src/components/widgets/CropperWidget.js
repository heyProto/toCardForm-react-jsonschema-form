import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import Modal from 'react-modal';
export default class CropperWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      cropResult: null,
      url:null,
      showModal:false,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChangeURL = this.onChangeURL.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

  }
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
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
      this.setState({ 
      src: reader.result,
      cropResult:null});
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
    var file = document.getElementById("file");
    if(file !== null){
      file.value = "";
    }
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
              viewMode={2}
              background = {false}
              modal = {true}
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
              { (this.state.cropResult === null)? "" :<img style={{ width: '70%',border:"1px solid black"}} src={this.state.cropResult} alt="cropped image" />}
            </div>
          </div>
          <br style={{ clear: 'both' }} />
        </div>
      );
    }else if(this.props.utype === "file"){
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
              viewMode={2}
              background = {false}
              modal = {true}
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
              { (this.state.cropResult === null)? "" :<img style={{ width: '70%',border:"1px solid black"}} src={this.state.cropResult} alt="cropped image" />}
            </div>
          </div>
          <br style={{ clear: 'both' }} />
        </div>
      );
    }else{
      if(this.state.src === null){
        var customStyle = {
          overlay:{
            "z-index":10
          }
        }
        return (
        <div>
          <button onClick={this.handleOpenModal} className = "default-button">Upload an Image</button>
          <Modal overlayClassName = {{ afterOpen: 'modal-container'}} isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example">
            <div>
              <div className = "check" style={{ width: '100%' }}>
                <label>File Upload: </label><input type="file" id="file" onChange={this.onChangeFile} />
                <div style = { {float:"right",marginTop:"-50px",marginRight:"400px"} }>
                  <label>URL Upload: </label><br/><input type="url" onChange={this.onChangeURL} />
                  <br/>
                  <br/>
                  <button onClick={()=>{this.loadImage(this.state.url)}} className = "btn">
                    Load Image
                  </button>
                </div>
                <br />
                <br />
              </div>
            </div>
            <button onClick={this.handleCloseModal}>Close Modal</button>
          </Modal>
        </div>
        );
      }
      return (
      <div>
        <button onClick={this.handleOpenModal}  className = "default-button">Upload an Image</button>
        <Modal isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example">
          <div>
            <div className = "check" style={{ width: '100%' }}>
              <label>File Upload: </label><input type="file" id="file" onChange={this.onChangeFile} />
              <div style = { {float:"right",marginTop:"-60px",marginRight:"400px"} }>
                <label>URL Upload: </label><br/><input type="url" onChange={this.onChangeURL} />
                <br/>
                <br/>
                <button onClick={()=>{this.loadImage(this.state.url)}} className = "btn">
                  Load Image
                </button>
              </div>
              <br />
              <br />
              <Cropper
                viewMode={2}
                background = {false}
                modal = {true}
                style={{ height: 300, width: '50%', marginTop:"30px"}}
                preview=".img-preview"
                aspectRatio = {eval(this.props.ratio)}
                guides={true}
                movable = {true}
                src={this.state.src}
                ref={cropper => { this.cropper = cropper; }}
              />
            </div>
            <div>
              <div className="box" style={{ width: '40%',float:'right'}}>
                <h1>
                  <button onClick={this.cropImage} style={{ marginLeft:"-120px",marginTop:"-400px"}} className = "btn">
                    Crop Image
                  </button>
                </h1>
                { (this.state.cropResult === null)? "" :<img style={{ width: '70%',marginTop: "-450px",border:"1px solid black"}} src={this.state.cropResult} alt="cropped image" />}
              </div>
            </div>
            <br style={{ clear: 'both' }} />
          </div>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </Modal>
      </div>
      );
    }
  }
}
