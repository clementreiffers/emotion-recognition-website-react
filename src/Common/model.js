import * as tf from "@tensorflow/tfjs";

const loadModel = async (link: string, setState: Function, state) => {
  try {
    setState({
      ...state,
      model: await tf.loadLayersModel(link),
      isModelSet: true,
    });
    console.log("load model success");
  } catch (err) {
    console.log(err);
  }
};

export { loadModel };
