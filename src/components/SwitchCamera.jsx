import React from "react";

const switchCamera = (props: { handleClick: Function, model: any }) => (
  <div className="info">
    {typeof props.model === "undefined" ? (
      <p style={{ color: "red" }}>loading, please wait ...</p>
    ) : (
      <p>
        Emotion Recognition
        <br />
        <a href="https://github.com/clementreiffers/emotion-recognition-website-react">
          github repository
        </a>
      </p>
    )}
    <button onClick={props.handleClick}>switch camera</button>
  </div>
);

export default switchCamera;
