import * as R from "ramda";
import * as tf from "@tensorflow/tfjs";
import { EMOTIONS } from "./emotions.constant";

const drawOnCanvas = (context, video, boundingBox, emotionRecognizer) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  context.drawImage(video, 0, 0, context.canvas.width, context.canvas.height);

  // recuperation of all values into boudingBox (coordinate of face)
  const xCenterBoundingBox = R.pluck("xCenter", boundingBox);
  const yCenterBoundingBox = R.pluck("yCenter", boundingBox);
  const widthBoundingBox = R.pluck("width", boundingBox);
  const heightBoundingBox = R.pluck("height", boundingBox);

  // rectangle draw all around the face
  context.beginPath();
  context.lineWidth = "0.8";
  context.strokeStyle = "red";
  context.rect(
    xCenterBoundingBox * context.canvas.width,
    yCenterBoundingBox * context.canvas.height,
    widthBoundingBox * context.canvas.width,
    heightBoundingBox * context.canvas.height
  );
  context.stroke();

  // recuperation of face only if boundingBox has valuable coordinates
  if (
    xCenterBoundingBox > 0 &&
    yCenterBoundingBox > 0 &&
    widthBoundingBox > 0 &&
    heightBoundingBox > 0
  ) {
    let face = context.getImageData(
      xCenterBoundingBox * context.canvas.width,
      yCenterBoundingBox * context.canvas.height,
      widthBoundingBox * context.canvas.width,
      heightBoundingBox * context.canvas.height
    );
    if (typeof emotionRecognizer != "undefined") {
      tf.engine().startScope();
      tf.tidy(() => {
        // Conversion to tensor4D and resize
        let tfImage = tf.browser.fromPixels(face, 3).expandDims(0);
        let tfResizedImage = tf.image.resizeBilinear(tfImage, [80, 80]);
        tfResizedImage = tfResizedImage.reshape([1, 80, 80, 3]);
        let prediction = Array.from(
          emotionRecognizer.predict(tfResizedImage).dataSync()
        );
        const currentEmotion = magnifyResults(EMOTIONS)(prediction);
        context.fillStyle = "#FFFFFF";
        const size = 50;
        context.fillRect(
          xCenterBoundingBox * context.canvas.width,
          yCenterBoundingBox * context.canvas.height - size,
          widthBoundingBox * context.canvas.width,
          size
        );
        context.font = size + "px serif";
        context.fillStyle = "#000000";
        context.stroke();
        context.fillText(
          currentEmotion,
          xCenterBoundingBox * context.canvas.width,
          yCenterBoundingBox * context.canvas.height,
          widthBoundingBox * context.canvas.width
        );

        tfImage.dispose();
      });
      // Check tensor memory leak stop
      tf.engine().endScope();
    }
  }
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

export default drawOnCanvas;
