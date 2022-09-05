import { useFaceDetection } from "react-use-face-detection";
import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "../stylesheet/WebcamModified.css";
import { URL_EMOTION_RECOGNITION_MODEL } from "../Constants/url.constant";
import drawOnCanvas from "../Common/canvas";
import VideoOnCanvas from "./VideoOnCanvas";
import SwitchCamera from "./SwitchCamera";
import { FACE_DETECTION_PROPS } from "../Constants/faceDetection.constant";
import { loadModel } from "../Common/model";
import { changeFacingMode } from "../Common/camera";

type stateType = { model: any, facingMode: string, isModelSet: boolean };

const _init_state = {
  model: null,
  facingMode: "environment",
  isModelSet: false,
};

const App = () => {
  const { webcamRef, boundingBox } = useFaceDetection(FACE_DETECTION_PROPS);
  let canvasRef = useRef(null);

  const [state, setState]: [stateType, Function] = useState(_init_state);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    let animationFrameId;
    const render = () => {
      drawOnCanvas(context, webcamRef.current.video, boundingBox, state.model);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return window.cancelAnimationFrame(animationFrameId);
  });

  useEffect(() => {
    // MODEL EMOTION RECOGNITION
    tf.ready().then(() =>
      loadModel(URL_EMOTION_RECOGNITION_MODEL, setState, state)
    );
  }, []);

  const handleClick = React.useCallback(() => {
    setState({
      ...state,
      facingMode: changeFacingMode(state.facingMode),
    });
  }, [state, setState]);

  return (
    <div>
      <SwitchCamera
        handleClick={handleClick}
        isModelLoaded={state.isModelSet}
      />
      <VideoOnCanvas
        canvasRef={canvasRef}
        webcamRef={webcamRef}
        facingMode={state.facingMode}
      />
    </div>
  );
};

export default App;
