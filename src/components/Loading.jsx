import React from "react";
import SyncIcon from "@mui/icons-material/Sync";
import "../stylesheet/loading.css";

export const Loading = () => (
  <p style={{ color: "red" }}>
    <SyncIcon className={"loading-icon"} /> loading, please wait ...
  </p>
);
