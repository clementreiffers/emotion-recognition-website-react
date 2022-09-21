import * as tf from "@tensorflow/tfjs";

const loadModel = async (link: string, setState: Function, state) => {
  console.log("loading model...");
  try {
    setState({
      ...state,
      model: await tf.loadLayersModel(link),
      isModelSet: true,
    });
    console.log("load model success");
  } catch (err) {
    console.log("couldn't load model : ", err);
  }
};

export { loadModel };
