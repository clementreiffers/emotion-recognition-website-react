import React from "react";
import ReactDOM from "react-dom/client";
import "./stylesheet/index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import WebcamModified from "./components/WebcamModified";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<WebcamModified />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
