import Webcam from "react-webcam";
import { VIDEO_CONSTRAINTS } from "../Constants/video.constant";
import React from "react";

type videoOnCanvasProps = {
  canvasRef: any,
  webcamRef: any,
  facingMode: string,
};

const VideoOnCanvas = (props: videoOnCanvasProps) => (
  <div>
    <canvas
      ref={props.canvasRef}
      width={1920}
      height={1080}
      style={{ objectFit: "cover" }}
      className="canvas"
    />
    <Webcam
      audio={false}
      width={1920}
      height={1080}
      mirrored={true}
      ref={props.webcamRef}
      videoConstraints={{ ...VIDEO_CONSTRAINTS, facingMode: props.facingMode }}
      style={{ display: "none" }}
    />
  </div>
);
export default VideoOnCanvas;
