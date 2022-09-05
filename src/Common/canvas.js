import * as R from "ramda";
import * as tf from "@tensorflow/tfjs";
import { EMOTIONS } from "../Constants/emotions.constant";

const _getValuesOfBoundingBox = R.applySpec({
  xCenter: R.pluck("xCenter"),
  yCenter: R.pluck("yCenter"),
  width: R.pluck("width"),
  height: R.pluck("height"),
});

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

const _getFace = (context, boundingBoxRefact) =>
  context.getImageData(
    boundingBoxRefact.xCenter * context.canvas.width,
    boundingBoxRefact.yCenter * context.canvas.height,
    boundingBoxRefact.width * context.canvas.width,
    boundingBoxRefact.height * context.canvas.height
  );

const _predict = (model, tfResizedImage) => {
  let predict = Array.from(model.predict(tfResizedImage).dataSync());
  tfResizedImage.dispose();
  return predict;
};

const _resizeImg = (img) =>
  tf.image.resizeBilinear(img, [80, 80]).reshape([1, 80, 80, 3]);

const _convertImgToTensor = (img) =>
  tf.browser.fromPixels(img, 3).expandDims(0);

const _treatImg = (img) => _resizeImg(_convertImgToTensor(img));

const _drawEmotionPanel = (context, boundingBox, prediction) => {
  const currentEmotion = magnifyResults(EMOTIONS)(prediction);
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
    currentEmotion,
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

const drawOnCanvas = (context, video, boundingBox, emotionRecognizer) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  context.drawImage(video, 0, 0, context.canvas.width, context.canvas.height);

  // recuperation of all values into boudingBox (coordinate of face)
  const boundingBoxRefact = _getValuesOfBoundingBox(boundingBox);

  _drawRect(context, boundingBoxRefact);
  // recuperation of face only if boundingBox has valuable coordinates
  if (_isBoundingBoxPositive(boundingBoxRefact)) {
    let face = _getFace(context, boundingBoxRefact);

    if (typeof emotionRecognizer != "undefined") {
      tf.engine().startScope();
      tf.tidy(() => {
        // Conversion to tensor4D and resize
        let prediction = _predict(emotionRecognizer, _treatImg(face));
        _drawEmotionPanel(context, boundingBoxRefact, prediction);
      });
      // Check tensor memory leak stop
      tf.engine().endScope();
    }
  }
};

export default drawOnCanvas;
