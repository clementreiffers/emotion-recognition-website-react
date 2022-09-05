import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import { URL_JS_DELIVR } from "./url.constant";

const locateFaceDetectionFile = (file: string): string =>
  `${URL_JS_DELIVR}${file}`;

const FACE_DETECTION_PROPS = {
  faceDetectionOptions: {
    model: "short",
  },
  faceDetection: new FaceDetection.FaceDetection({
    locateFile: (file) => locateFaceDetectionFile(file),
  }),
  camera: ({ mediaSrc, onFrame, width, height }) =>
    new Camera(mediaSrc, {
      onFrame,
      width,
      height,
    }),
};

export { FACE_DETECTION_PROPS };
