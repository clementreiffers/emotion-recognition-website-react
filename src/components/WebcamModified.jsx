import { useFaceDetection } from "react-use-face-detection";
import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "../stylesheet/WebcamModified.css";
import { URL_EMOTION_RECOGNITION_MODEL } from "../Common/url.constant";
import drawOnCanvas from "../Common/canvas";
import VideoOnCanvas from "./VideoOnCanvas";
import SwitchCamera from "./SwitchCamera";
import { FACE_DETECTION_PROPS } from "../Common/faceDetection.constant";
import { loadModel } from "../Common/model";
import { changeFacingMode } from "../Common/camera";

const WebcamModified = () => {
  const { webcamRef, boundingBox } = useFaceDetection(FACE_DETECTION_PROPS);
  let canvasRef = useRef(null);
  const [model, setModel] = useState();
  const [facingMode, setFacingMode] = React.useState("environment");

  // MODEL EMOTION RECOGNITION
  tf.ready().then(() => loadModel(URL_EMOTION_RECOGNITION_MODEL, setModel));

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;
    const render = () => {
      drawOnCanvas(context, webcamRef.current.video, boundingBox, model);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => window.cancelAnimationFrame(animationFrameId);
  });

  const handleClick = React.useCallback(() => {
    setFacingMode((prevState) => changeFacingMode(prevState, setFacingMode));
  }, []);

  return (
    <div>
      <SwitchCamera handleClick={handleClick} model={model} />
      <VideoOnCanvas
        canvasRef={canvasRef}
        webcamRef={webcamRef}
        facingMode={facingMode}
      />
    </div>
  );
};

export default WebcamModified;
