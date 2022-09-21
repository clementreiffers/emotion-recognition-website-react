import { predict } from "./tensorflowPredictions";

const _drawRect = (context, boundingBox) => {
  // rectangle draw all around the face
  context.beginPath();
  context.lineWidth = "0.8";
  context.strokeStyle = "red";
  context.rect(
    boundingBox.xCenter * context.canvas.width,
    boundingBox.yCenter * context.canvas.height,
    boundingBox.width * context.canvas.width,
    boundingBox.height * context.canvas.height
  );
  context.stroke();
};

const _getFace = (context, boundingBox) =>
  context.getImageData(
    boundingBox.xCenter * context.canvas.width,
    boundingBox.yCenter * context.canvas.height,
    boundingBox.width * context.canvas.width,
    boundingBox.height * context.canvas.height
  );

const _drawEmotionPanel = (context, boundingBox, prediction) => {
  context.fillStyle = "#FFFFFF";
  const size = 50;
  context.fillRect(
    boundingBox.xCenter * context.canvas.width,
    boundingBox.yCenter * context.canvas.height - size,
    boundingBox.width * context.canvas.width,
    size
  );
  context.font = size + "px serif";
  context.fillStyle = "#000000";
  context.stroke();
  context.fillText(
    prediction,
    boundingBox.xCenter * context.canvas.width,
    boundingBox.yCenter * context.canvas.height,
    boundingBox.width * context.canvas.width
  );
};

const _isBoundingBoxPositive = (boundingBox) =>
  boundingBox.xCenter > 0 &&
  boundingBox.yCenter > 0 &&
  boundingBox.width > 0 &&
  boundingBox.height > 0;

const _clearCanvas = (context) =>
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

const _drawImage = (video, context) =>
  context.drawImage(video, 0, 0, context.canvas.width, context.canvas.height);

const _drawPrediction = (context, bb, emotionRecognizer, state) =>
  _drawEmotionPanel(
    context,
    bb,
    predict(emotionRecognizer, state, _getFace(context, bb))
  );

const drawOnCanvas = (
  state,
  context,
  video,
  boundingBox,
  emotionRecognizer
) => {
  _clearCanvas(context);
  _drawImage(video, context);
  for (let bb of boundingBox) {
    // recuperation of all values into boundingBox (coordinate of face)
    _drawRect(context, bb);
    // recuperation of face only if boundingBox has valuable coordinates
    if (_isBoundingBoxPositive(bb) && state.isModelSet) {
      _drawPrediction(context, bb, emotionRecognizer, state);
    }
  }
};

export default drawOnCanvas;
