import Webcam from "react-webcam";
import { useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";

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
  return (
    <div>
      <p>loading: {isLoading}</p>
      <p>face detected: {detected ? "YES" : "NO"}</p>
      <p>number of faces detected: {facesDetected}</p>
      <div>
        {boundingBox.map((box, index) => (
          <div
            key={index + 1}
            style={{
              border: "4px solid red",
              position: "absolute",
              top: `${box.yCenter * 100}%`,
              left: `${box.xCenter * 100}%`,
              width: `${box.width * 110}%`,
              height: `${box.height * 150}%`,
              zIndex: 1,
            }}
          />
        ))}

        <Webcam
          ref={webcamRef}
          forceScreenshotSourceSize
          style={{ height: "100%", width: "100%", position: "absolute" }}
        />
      </div>
    </div>
  );
};

export default WebcamModified;
