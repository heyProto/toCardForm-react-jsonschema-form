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
  }
  chooseFile(){
    var file = document.getElementById('file');
    file.click();
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
  saveData = ()=>{
    console.log(this.state,this.props);
    this.props.onch(this.state.cropResult);
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
        return (
        <div>
          <button onClick={this.handleOpenModal} className = "default-button">Upload an Image</button>
          <Modal style={{overlay: {
          width: "980px",
          padding: "15px",
          border: "1px solid #efefef",
          boxShadow: "0px 10px 20px #efefef",
          borderRadius: "4px",
          display: "inline-block",
          zIndex: 10}}} isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example">
            <div className="form-group form-col-4">
              <div className="ui action input">
                <input type ="text" placeholder="Enter a URL"/>
                <button className ="ui button" onClick={()=>{this.loadImage(this.state.url)}} >Upload</button>
              </div>
            </div>
            <span>{'\u00A0'} Or {'\u00A0'}</span>
            <div className="form-group form-col-4">
                <input type = "file" id="file" name = "file" style = {{ display: 'none' }} onChange={this.onChangeFile}/>
                <label className="form-label" htmlFor="root_bio">Upload</label>
                <button type="button" htmlFor = "file" className="default-button" onClick = {this.chooseFile}>Choose image</button>
            </div>
            <div className="form-clearfix"></div>
            <div className="form-col-6">
                <div className="image-crop-area">
                    Image crop area
                    <Cropper
                      viewMode={2}
                      background = {false}
                      modal = {true}
                      checkCrossOrigin={true}
                      style={{ height: 300, width: '100%' }}
                      preview=".img-preview"
                      aspectRatio = {eval(this.props.ratio)}
                      guides={true}
                      movable = {true}
                      src={this.state.src}
                      ref={cropper => { this.cropper = cropper; }}
                    />
                </div>
                <button type="button" className="default-button primary-button" onClick={this.cropImage}>Crop image</button>
            </div>
            <div className="form-col-6">
                <div className="image-display-area">
                    Image display area
                </div>
                <button type="button" className="default-button disabled-button">Save</button>
            </div>
            <button onClick={this.handleCloseModal}>Close Modal</button>
          </Modal>
        </div>
        );
      }
      return (
      <div>
          <button onClick={this.handleOpenModal} className = "default-button">Upload an Image</button>
          <Modal style={{overlay: {
          width: "980px",
          padding: "15px",
          border: "1px solid #efefef",
          boxShadow: "0px 10px 20px #efefef",
          borderRadius: "4px",
          display: "inline-block",
          zIndex: 10}}} isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example">
            <div className="form-group form-col-4">
              <div className="ui action input">
                <input type ="text" placeholder="Enter a URL"/>
                <button className ="ui button" onClick={()=>{this.loadImage(this.state.url)}} >Upload</button>
              </div>
            </div>
            <span>{'\u00A0'} Or {'\u00A0'}</span>
            <div className="form-group form-col-4">
                <input type = "file" id="file" name = "file" style = {{ display: 'none' }} onChange={this.onChangeFile}/>
                <label className="form-label" htmlFor="root_bio">Upload</label>
                <button type="button" htmlFor = "file" className="default-button" onClick = {this.chooseFile}>Choose image</button>
            </div>
            <div className="form-clearfix"></div>
            <div className="form-col-6">
                <div className="image-crop-area">
                    Image crop area
                    <Cropper
                      viewMode={2}
                      background = {false}
                      modal = {true}
                      checkCrossOrigin={true}
                      style={{ height: 300, width: '100%' }}
                      preview=".img-preview"
                      aspectRatio = {eval(this.props.ratio)}
                      guides={true}
                      movable = {true}
                      src={this.state.src}
                      ref={cropper => { this.cropper = cropper; }}
                    />
                </div>
                <button type="button" className="default-button primary-button" onClick={this.cropImage}>Crop image</button>
            </div>
            <div className="form-col-6">
                <div className="image-display-area">
                    Image display area
                    { (this.state.cropResult === null)? "" :<img style={{ width: '100%',border:"2px solid black"}} src={this.state.cropResult} alt="cropped image" />}
                </div>
                <button type="button" className="default-button disabled-button" onClick = {this.saveData}>Save</button>
            </div>
            <button onClick={this.handleCloseModal}>Close Modal</button>
          </Modal>
        </div>
      );
    }
  }
}
