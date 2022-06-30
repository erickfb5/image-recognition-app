import React from "react";
import "./ImageLinkForm.css";

// const description = `Our <span className="blinking">AI</span> will detect faces in your pictures. Paste your url, click "Detect", and watch the magic happen!!!`;
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div>
      <p className="f3 pa5 center white">Our <span className="blinking">&nbsp;AI&nbsp;</span>will detect some information from your pictures. Paste your url, click "Detect", and watch the magic happen!!!</p>
      <div className="center">  
        <div className="pa4 w-60 br3 shadow-5 center ai-bg">
          <input className="f4 pa2 w-70 center ai-white-bg" type="text" onChange={onInputChange}/>
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-red" onClick={onButtonSubmit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
