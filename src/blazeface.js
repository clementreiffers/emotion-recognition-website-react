import * as tf from "@tensorflow/tfjs";
import * as R from "ramda";

// link : "https://tfhub.dev/tensorflow/tfjs-model/blazeface/1/default/1"

const preprocessImage = (inputImage) => {
  // 2: Convert input to a tensor with `fromPixels`
  const inputImageTensor = tf.expandDims(
    tf.cast(tf.browser.fromPixels(inputImage), "float32"),
    0
  );
  // 3: Convert image tensor to size and format expected by pre-trained model
  const resizedImage = tf.image.resizeBilinear(inputImageTensor, [128, 128]);
  return tf.mul(tf.sub(tf.div(resizedImage, 255), 0.5), 2);
};

const estimateFaces = (blazeface, normalizedImage) =>
  tf.squeeze(blazeface.predict(normalizedImage));

const loadBlazeface = async (link) =>
  await tf.loadGraphModel(link, { fromTFHub: true });

export { loadBlazeface, preprocessImage, estimateFaces };
