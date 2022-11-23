import React, { useState } from "react";
import { Loading } from "./Loading";
import { GithubLink } from "./GithubLink";

type switchCameraProps = {
  isModelLoaded: boolean,
  setConstraints: Function,
};

const isVideoInput = ({ kind }) => kind === "videoinput";

const keepVideoInput = (mediaDevices) => mediaDevices.filter(isVideoInput);

const SwitchCamera = (props: switchCameraProps) => {
  const [devices, setDevices] = useState([]);

  // const keepAndSetMediaDevices = R.pipe(keepVideoInput, setDevices);
  //
  // const handleDevices = useCallback(keepAndSetMediaDevices, [
  //   keepAndSetMediaDevices,
  // ]);
  //
  // const getAndSetVideoInput = () =>
  //   navigator.mediaDevices.enumerateDevices().then(handleDevices);
  //
  // useEffect(getAndSetVideoInput, [getAndSetVideoInput]);
  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <div className="info">
      {!props.isModelLoaded ? <Loading /> : <GithubLink />}
      <div>
        {devices.map((device, key) => (
          <button
            key={device.deviceId}
            onClick={() => props.setConstraints(device)}
          >
            {device.label || `Device ${key + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SwitchCamera;
