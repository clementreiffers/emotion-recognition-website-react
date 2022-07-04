import Webcam from "react-webcam";
import { useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import { useEffect, useRef } from "react";
import * as R from "ramda";

const cameraDisplayStyle = {
  width: "60%",
  position: "absolute",
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
  const canvasTestRef = useRef(null);

  const drawOnCanvas = (context, video, boundingBox) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(video, 0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "red";
    const xCenterBoundingBox = R.pluck("xCenter", boundingBox);
    const yCenterBoundingBox = R.pluck("yCenter", boundingBox);
    const widthBoundingBox = R.pluck("width", boundingBox);
    const heightBoundingBox = R.pluck("height", boundingBox);

    context.rect(
      xCenterBoundingBox * context.canvas.width,
      yCenterBoundingBox * context.canvas.height,
      widthBoundingBox * context.canvas.width,
      heightBoundingBox * context.canvas.height
    );

    let canvasTest = canvasTestRef.current;
    let contextTest = canvasTest.getContext("2d");
    if (
      xCenterBoundingBox > 0 &&
      yCenterBoundingBox > 0 &&
      widthBoundingBox > 0 &&
      heightBoundingBox > 0
    ) {
      let face = context.getImageData(
        R.pluck("xCenter", boundingBox) * context.canvas.width,
        R.pluck("yCenter", boundingBox) * context.canvas.height,
        R.pluck("width", boundingBox) * context.canvas.width,
        R.pluck("height", boundingBox) * context.canvas.height
      );
    }

    // contextTest.drawImage(face, 0, 0, 50, 50);
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
        <canvas ref={canvasTestRef} style={cameraDisplayStyle} />
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
