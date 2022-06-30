import React from "react";
// import "./ImageRecognition.css";

const ImageRecognition = ({ imageUrl }) => {
  return (
    <div className="center ma">
      <div className=" mt2">
        <img
        id="inputimage"
          alt=""
          src={imageUrl}
          width="500px"
          height="auto"
         
        />
      </div>
    </div>
  );
};

export default ImageRecognition;
