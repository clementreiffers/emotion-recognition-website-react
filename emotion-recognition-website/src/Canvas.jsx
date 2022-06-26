import React, { useEffect, useRef } from "react";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  let faceDetector;
  let emotionDetector;

  const setupCamera = async (video, canvas) => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: canvas.width, height: canvas.height },
        audio: false,
      })
      .then((stream) => {
        video.srcObject = stream;
      });
    // faceDetector = await blazeface.load();
    // emotionDetector = await tf.loadLayersModel(
    //   "https://raw.githubusercontent.com/Im-Rises/emotion-recognition-website/main/resnet50js_ferplus/model.json"
    // );
  };

  const draw = (ctx, video, canvas) => {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.beginPath();
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const video = videoRef.current;

    let animationFrameId;

    setupCamera(video, canvas);

    const render = () => {
      draw(context, video, canvas);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [draw]);

  return (
    <div>
      <video ref={videoRef} {...props}></video>
      <canvas ref={canvasRef} {...props} />
    </div>
  );
};

export default Canvas;
