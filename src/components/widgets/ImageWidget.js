import React, { Component } from "react";
import PropTypes from "prop-types";
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import Modal from 'react-modal';
import { dataURItoBlob, shouldRender, setState } from "../../utils";

function addNameToDataURL(dataURL, name) {
  return dataURL.replace(";base64", `;name=${name};base64`);
}
class ImageWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      cropResult: null,
      url:null,
      showModal:false,
      zoom:0.5,
      srcStore:null
    };
    this.cropImage = this.cropImage.bind(this);
    this.cropModal = this.cropModal.bind(this);
    this.onChangeURL = this.onChangeURL.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }
  
  
  handleOpenModal () {
    console.log(this.props)
    this.setState({ 
      showModal: true 
    });
  }
  
  handleCloseModal () {
    this.setState({ 
      src:this.state.srcStore,
      showModal: false
    });
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
  }
  
  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    
    const data = this.cropper.getCroppedCanvas().toDataURL();
    this.setState({
      cropResult: data,
    });
    this.props.onChange(data);
  }
  cropModal(){
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    const data = this.cropper.getCroppedCanvas().toDataURL();
    this.props.onChange(data);
    this.setState({
      srcStore:this.state.src,
      showModal:false
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
  ratioReturn( fraction ){
    var bits = fraction.split("/");
    return parseInt(bits[0],10)/parseInt(bits[1],10);
  }
  zoom = ()=>{
    var zoomVal = document.getElementById("zoom");
    var value = zoomVal.value;
    this.setState({
      zoom:value
    });
  }
  render() {
    if(this.props.schema.utype === "url"){
       if(this.state.src === null){
          return (
              <div>
                  <div className = "check" style={{ width: '100%' }}>
                  <input type="url" onChange={this.onChangeURL} />
                  <br />
                  <br />
                  <button type = "button" onClick={()=>{this.loadImage(this.state.url)}} className = "btn">
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
            <button type = "button" onClick={()=>{this.loadImage(this.state.url)}} className = "btn">
              Load Image
            </button>
            <br />
            <br />
            <Cropper
              zoomOnWheel={false}
              zoomOnTouch={false}
              viewMode={2}
              background = {false}
              modal = {true}
              checkCrossOrigin={true}
              style={{ height: 200, width: '50%' }}
              preview=".img-preview"
              aspectRatio = {this.ratioReturn(this.props.schema.ratio)}
              guides={true}
              movable = {true}
              src={this.state.src}
              ref={cropper => { this.cropper = cropper; }}
              zoomTo = {this.state.zoom}
            />
            <input type = "range"  min="0.05" max="2" step="0.05" value={this.state.zoom} onChange = {this.zoom} id = "zoom" style={{width:"52.5%"}}/>
          </div>
          <div>
            <div className="box" style={{ width: '50%'}}>
              <h1>
                <button type = "button" onClick={this.cropImage} className = "btn">
                  Crop Image
                </button>
              </h1>
              { (this.state.cropResult === null)? "" :<img style={{ width: '70%',border:"1px solid black"}} src={this.state.cropResult} alt="cropped image" />}
            </div>
          </div>
          <br style={{ clear: 'both' }} />
        </div>
      );
    }else if(this.props.schema.utype === "file"){
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
              zoomOnWheel={false}
              zoomOnTouch={false}
              viewMode={2}
              background = {false}
              modal = {true}
              style={{ height: 200, width: '50%' }}
              preview=".img-preview"
              aspectRatio = {this.ratioReturn(this.props.schema.ratio)}
              guides={true}
              movable = {true}
              src={this.state.src}
              ref={cropper => { this.cropper = cropper; }}
              zoomTo = {this.state.zoom}
            />
            <input type = "range"  min="0" max="2" step="0.05" value={this.state.zoom} onChange = {this.zoom} id = "zoom" style={{width:"52.5%"}}/>
          </div>
          <div>
            <div className="box" style={{ width: '50%'}}>
              <h1>
                <button type = "button" onClick={this.cropImage} className = "btn">
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
          <button type = "button" onClick={this.handleOpenModal} className = "default-button">Upload an Image</button>
          <Modal style={{overlay: {
          width: "600px",
          position:"absolute",
          left:"50%",
          top:"50%",
          height:"85%",
          transform: "translate(-50%, -50%)",
          padding: "15px",
          border: "1px solid #efefef",
          boxShadow: "0px 10px 20px #efefef",
          borderRadius: "4px",
          display: "inline-block",
          zIndex: 10},
          content: {
            margin:"-40px"
          }}} isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example">
          <div style = {{position:"absolute",right:"1",top:"7"}}>
            <button button = "button" className="circular ui icon button"  onClick={this.handleCloseModal} style = {{ backgroundColor:"white"}}>
              <i className ="remove icon" style = {{ color:"black",fontSize:"20px"}}></i>
            </button>          
          </div>
          <div className = "modal-title">
            {this.props.schema.title}
          </div>
            <div className="form-group form-col-4">
              <label style = {{ marginLeft:"0px" }} className = "form-lable-hint">Enter Image URL</label>
              <div className="ui action input">
                  <input type ="url" style = {{ width:"250px"}}onChange = {this.onChangeURL}/>
                  <button type = "button" className ="ui button" onClick={()=>{this.loadImage(this.state.url)}} >Upload</button>
              </div>
            </div>
            <span style = {{marginLeft:"190px",fontWeight:"700"}}>{'\u00A0'} OR {'\u00A0'}</span>
            <div className="form-group form-col-4" style = {{width:"25%"}}>
                <label className = "form-lable-hint" style = {{ marginLeft:"0px" }}>Upload from Computer</label>
                <input type = "file" id="file" name = "file" style = {{ display: 'none' }} onChange={this.onChangeFile}/>
                <button type="button" htmlFor = "file" style = {{padding:"9px 12px"}} className="default-button" onClick = {this.chooseFile}>Choose an image</button>
            </div>
            <div className="form-clearfix"></div>
            <div className="form-col-12">
                <div className="image-crop-area" style={{textAlign:"center"}}>
                   <i className ="image icon" style = {{ position:"relative",top: "135px",color:"rgb(210, 210, 210)",fontSize:"50px"}}></i>
                </div>
            </div>
          </Modal>
        </div>
        );
      }
      return (
      <div>
          <button type = "button" onClick={this.handleOpenModal} className = "default-button">Upload an Image</button>
          <Modal style={{overlay: {
            width: "600px",
            height:"500px",
            padding: "15px",
            position:"absolute",
            left:"50%",
            top:"50%",
            height:"90%",
            transform: "translate(-50%, -50%)",
            border: "1px solid #efefef",
            boxShadow: "0px 10px 20px #efefef",
            borderRadius: "4px",
            display: "inline-block",
            zIndex: 10},
          content: {
            margin:"-40px"
          }}} isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example">
           <div style = {{position:"absolute",right:"1",top:"7"}}>
            <button type = "button" className="circular ui icon button"  onClick={this.handleCloseModal} style = {{ backgroundColor:"white"}}>
              <i className ="remove icon" style = {{ color:"#aaa",fontSize:"20px"}}></i>
            </button>          
          </div>
            <div className = "modal-title">
              Upload an Image
            </div>
            <div className="form-group form-col-4">
              <label style = {{ marginLeft:"0px" }} className = "form-lable-hint">Enter Image URL</label>
              <div className="ui action input">
                  <input type ="url" style = {{ width:"250px"}} onChange = {this.onChangeURL}/>
                  <button type = "button" className ="ui button" onClick={()=>{this.loadImage(this.state.url)}} >Upload</button>
              </div>
            </div>
            <span style = {{marginLeft:"190px",fontWeight:"700"}}>{'\u00A0'} OR {'\u00A0'}</span>
            <div className="form-group form-col-4" style = {{width:"25%"}}>
                <label className = "form-lable-hint" style = {{ marginLeft:"0px" }}>Upload from Computer</label>
                <input type = "file" id="file" name = "file" style = {{ display: 'none' }} onChange={this.onChangeFile}/>
                <button type="button" htmlFor = "file" style = {{padding:"9px 12px"}} className="default-button" onClick = {this.chooseFile}>Choose an image</button>
            </div>
            <div className="form-clearfix"></div>
            <div className="form-col-12">
                <div className="image-crop-area">
                    <Cropper
                      cropBoxResizable = {false}
                      toggleDragModeOnDblclick = {false}
                      dragMode='move'
                      cropBoxMovable = {false}
                      zoomOnWheel={false}
                      zoomOnTouch={false}
                      viewMode={1}
                      background = {false}
                      modal = {true}
                      checkCrossOrigin={true}
                      style={{ height: 300, width: '100%' }}
                      preview=".img-preview"
                      aspectRatio = {this.ratioReturn(this.props.schema.ratio)}
                      guides={false}
                      movable = {true}
                      src={this.state.src}
                      ref={cropper => { this.cropper = cropper; }}
                      zoomTo = {this.state.zoom}
                    />
                    <div style = {{ marginTop:"8px"}}><i style = {{ fontSize:"10px"}}className ="image icon"></i><i className ="image icon" style = {{ fontSize:"17px", position:"absolute",right:"30"}}>  </i><input type = "range"  min="0.1" max="2" step="0.05" value={this.state.zoom} onChange = {this.zoom} id = "zoom" style={{width:"97%"}}/></div>
                </div>
                <button type="button" style = {{position:'absolute',right:'35px'}} className="default-button primary-button" onClick={this.cropModal}>Upload</button>
            </div>
          </Modal>
        </div>
      );
    }
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
