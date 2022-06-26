import * as React from "react";

import WebcamNative from "react-webcam-as";

class Example extends React.Component {
  state = {
    webcamData: null,
  };
  handleOnChange = (data) => {
    this.setState({ webcamData: data });
  };
  render() {
    const { webcamData } = this.state;
    return (
      <div>
        <WebcamNative
          accept="image/*"
          label="Camera"
          onChange={this.handleOnChange}
          buttonStyle={{ textTransform: "none" }}
        />
        {webcamData && webcamData.type && webcamData.type.includes("image") && (
          <img
            src={webcamData.dataUrl}
            alt="webcam"
            width="100%"
            style={{ imageOrientation: "from-image" }}
          />
        )}
        {webcamData && webcamData.type && webcamData.type.includes("video") && (
          <video controls width="100%">
            <source src={webcamData.dataUrl} />
          </video>
        )}
        {webcamData && webcamData.type && webcamData.type.includes("audio") && (
          <audio controls>
            <source src={webcamData.dataUrl} />
          </audio>
        )}
      </div>
    );
  }
}
export default Example;
