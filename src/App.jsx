import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";

const App = (props) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);

  const videoConstraints = {
    width: 1920,
    height: 1280,
    facingMode: "user",
  };

  const draw = (image, ctx, canvas) => {
    ctx.reset();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");

    let animationFrameId;

    const render = () => {
      draw(webcamRef.current.video, context, canvas);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [draw]);

  return (
    <>
      <Webcam audio={false} ref={webcamRef} width={0} height={0} />
      <canvas
        ref={canvasRef}
        width={videoConstraints.width}
        height={videoConstraints.height}
      />
    </>
  );
};

export default App;