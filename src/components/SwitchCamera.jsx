import React from "react";
import { Loading } from "./Loading";
import { GithubLink } from "./GithubLink";

type switchCameraProps = {
  handleClick: Function,
  isModelLoaded: boolean,
};

const switchCamera = (props: switchCameraProps) => (
  <div className="info">
    {!props.isModelLoaded ? <Loading /> : <GithubLink />}
    <button onClick={props.handleClick}>switch camera</button>
  </div>
);

export default switchCamera;
