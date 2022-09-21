import { EMOTIONS, NO_MODEL } from "../Constants/emotionRecognizer.constant";
import * as tf from "@tensorflow/tfjs";
import magnifyResults from "./magnifyResults";
import { treatImg } from "./tensorflowImages";

const _predictTensor = (state, model, tfResizedImage) => {
  if (state.isModelSet) {
    let predict = Array.from(model.predict(tfResizedImage).dataSync());
    tfResizedImage.dispose();
    return magnifyResults(EMOTIONS)(predict);
  } else {
    return NO_MODEL;
  }
};
const _predictImg = (emotionRecognizer, state, face) =>
  _predictTensor(state, emotionRecognizer, treatImg(face));

const predict = (emotionRecognizer, state, face) => {
  let prediction = "";
  tf.engine().startScope();
  tf.tidy(() => {
    prediction = _predictImg(emotionRecognizer, state, face);
  });
  // Check tensor memory leak stop
  tf.engine().endScope();
  return prediction;
};

export { predict };
