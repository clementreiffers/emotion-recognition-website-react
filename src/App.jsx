import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { estimateFaces, loadBlazeface, preprocessImage } from "./blazeface";

const draw = (image, ctx, canvas) => {
  ctx.reset();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.beginPath();
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  ctx.fill();
};

const App = (props) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const link = "https://tfhub.dev/tensorflow/tfjs-model/blazeface/1/default/1";
  const blazefaceModel = loadBlazeface(link);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);

  const videoConstraints = {
    width: 1920,
    height: 1280,
    facingMode: "user",
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    let video = webcamRef.current.video;

    let animationFrameId;

    const render = () => {
      draw(video, context, canvas);
      // let image = preprocessImage(video);
      // let face = estimateFaces(blazefaceModel, image);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => window.cancelAnimationFrame(animationFrameId);
  });

  return (
    <>
      <Webcam
        audio={false}
        screenshotFormat="HTMLImageElement"
        ref={webcamRef}
        width={0}
        height={0}
      />
      <canvas
        ref={canvasRef}
        width={videoConstraints.width}
        height={videoConstraints.height}
      />
    </>
  );
};

export default App;
