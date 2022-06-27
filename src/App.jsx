import React from "react";
import WebCam from "react-camera";

const Canvas = (props) => {
  return (
    <>
      <div>
        <canvas></canvas>
        <WebCam></WebCam>
      </div>
    </>
  );
};

export default Canvas;
