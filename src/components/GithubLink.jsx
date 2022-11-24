import React from "react";
import { URL_GITHUB_CODE_SOURCE } from "../Constants/url.constant";
import GitHubIcon from "@mui/icons-material/GitHub";
export const GithubLink = () => (
  <>
    Emotion Recognition
    <a href={URL_GITHUB_CODE_SOURCE}>
      <GitHubIcon style={{ color: "white" }} />
    </a>
  </>
);
