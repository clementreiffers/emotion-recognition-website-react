import * as R from "ramda";
import * as tf from "@tensorflow/tfjs";
import {
  EMOTIONS,
  PRED_RESIZE_SHAPE,
  RESIZE_SHAPE,
} from "../Constants/emotionRecognizer.constant";

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

const _predict = (state, model, tfResizedImage) => {
  if (state.isModelSet) {
    let predict = Array.from(model.predict(tfResizedImage).dataSync());
    tfResizedImage.dispose();
    return magnifyResults(EMOTIONS)(predict);
  } else {
    return "❌ model not loaded yet";
  }
};

const _resizeImg = (img) =>
  tf.image.resizeBilinear(img, RESIZE_SHAPE).reshape(PRED_RESIZE_SHAPE);

const _convertImgToTensor = (img) =>
  tf.browser.fromPixels(img, 3).expandDims(0);

const _treatImg = (img) => _resizeImg(_convertImgToTensor(img));

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

const getPercentage = R.pipe(R.multiply(100), parseInt);

const getScoreInPercentage = R.map(getPercentage);

const getEmotionNearToItsScore = (listOfEmotions) => (pred) =>
  R.transpose([listOfEmotions, pred]);

const getListOfEmotionsSorted = R.sortBy(R.prop(1));

const magnifyResults = (listOfEmotions) =>
  R.pipe(
    getScoreInPercentage,
    getEmotionNearToItsScore(listOfEmotions),
    getListOfEmotionsSorted,
    R.reverse,
    R.nth(0),
    R.append(" %"),
    R.join("")
  );

const _isBoundingBoxPositive = (boundingBox) =>
  boundingBox.xCenter > 0 &&
  boundingBox.yCenter > 0 &&
  boundingBox.width > 0 &&
  boundingBox.height > 0;

const drawOnCanvas = (
  state,
  context,
  video,
  boundingBox,
  emotionRecognizer
) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  context.drawImage(video, 0, 0, context.canvas.width, context.canvas.height);

  for (let bb of boundingBox) {
    // recuperation of all values into boundingBox (coordinate of face)
    _drawRect(context, bb);
    // recuperation of face only if boundingBox has valuable coordinates
    if (_isBoundingBoxPositive(bb)) {
      let face = _getFace(context, bb);

      if (typeof emotionRecognizer != "undefined") {
        tf.engine().startScope();
        tf.tidy(() => {
          let prediction = _predict(state, emotionRecognizer, _treatImg(face));
          _drawEmotionPanel(context, bb, prediction);
        });
        // Check tensor memory leak stop
        tf.engine().endScope();
      }
    }
  }
};

export default drawOnCanvas;