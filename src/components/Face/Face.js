import React from "react";
import Tilt from "react-parallax-tilt";
import face from "./face.png";
import "./Face.css";

const Face = () => {
  return (
    <div className="ma0 mt0">
      <Tilt
        className="Tilt"
        style={{ height: "150px", width: "300px", background: "rgb(0,0,0,0)" }}
      >
        <div className="Tilt-inner">
          <img className="face" alt="face logo" src={face} />
        </div>
      </Tilt>
    </div>
  );
};

export default Face;
