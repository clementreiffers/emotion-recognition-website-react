const changeFacingMode = (facingMode, setFacingMode) =>
  setFacingMode(facingMode === "user" ? "environment" : "user");

export { changeFacingMode };
