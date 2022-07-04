import Webcam from "react-webcam";
import { useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import { useEffect, useRef } from "react";
import * as R from "ramda";

const cameraDisplayStyle = {
  height: "60%",
  width: "60%",
  position: "absolute",
  // display: "none",
};

const WebcamModified = () => {
  const { webcamRef, boundingBox, isLoading, detected, facesDetected } =
    useFaceDetection({
      faceDetectionOptions: {
        model: "short",
      },
      faceDetection: new FaceDetection.FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      }),
      camera: ({ mediaSrc, onFrame, width, height }) =>
        new Camera(mediaSrc, {
          onFrame,
          width,
          height,
        }),
    });
  let canvasRef = useRef(null);
  const drawOnCanvas = (context, video, boundingBox) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(video, 0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "red";
    context.rect(
      R.pluck("xCenter", boundingBox) * context.canvas.width,
      R.pluck("yCenter", boundingBox) * context.canvas.height,
      R.pluck("width", boundingBox) * context.canvas.width,
      R.pluck("height", boundingBox) * context.canvas.height
    );
    context.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

    const render = () => {
      drawOnCanvas(context, webcamRef.current.video, boundingBox);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => window.cancelAnimationFrame(animationFrameId);
  });

  return (
    <div>
      <p>loading: {isLoading}</p>
      <p>face detected: {detected ? "YES" : "NO"}</p>
      <p>number of faces detected: {facesDetected}</p>
      <div>
        <canvas ref={canvasRef} style={cameraDisplayStyle} />
        <Webcam
          ref={webcamRef}
          forceScreenshotSourceSize
          screenshotFormat="image/bitmap"
          style={cameraDisplayStyle}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default WebcamModified;
