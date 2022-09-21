import * as tf from "@tensorflow/tfjs";
import {
  PRED_RESIZE_SHAPE,
  RESIZE_SHAPE,
} from "../Constants/emotionRecognizer.constant";

const _resizeImg = (img) =>
  tf.image.resizeBilinear(img, RESIZE_SHAPE).reshape(PRED_RESIZE_SHAPE);

const _convertImgToTensor = (img) =>
  tf.browser.fromPixels(img, 3).expandDims(0);

const treatImg = (img) => _resizeImg(_convertImgToTensor(img));

export { treatImg };
