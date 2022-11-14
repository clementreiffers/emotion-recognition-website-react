import React, { useState } from "react";
import { Loading } from "./Loading";
import { GithubLink } from "./GithubLink";
import * as R from "ramda";

type switchCameraProps = {
  handleClick: Function,
  isModelLoaded: boolean,
};

const isVideoInput = ({ kind }) => kind === "videoinput";

const isNotUndefined = R.has("kind");

const removeUndefined = R.filter(isNotUndefined);

const keepVideoDevices = (devices) =>
  devices.map((dev) => {
    if (isVideoInput(dev)) return dev;
    return null;
  });

const getAllDevices = (setDevices) => {
  navigator.mediaDevices
    .enumerateDevices()
    .then(R.pipe(keepVideoDevices, setDevices));
};

const SwitchCamera = (props: switchCameraProps) => {
  const [devices, setDevices] = useState(null);

  getAllDevices(setDevices);
  console.log(devices);
  return (
    <div className="info">
      {!props.isModelLoaded ? <Loading /> : <GithubLink />}
      <button onClick={props.handleClick}>switch camera</button>
    </div>
  );
};

export default SwitchCamera;
