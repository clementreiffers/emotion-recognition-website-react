import * as tf from "@tensorflow/tfjs";

const loadModel = async (link: string, setState: Function, state) => {
  try {
    setState({
      ...state,
      model: await tf.loadLayersModel(link),
      isModelSet: true,
    });
  } catch (err) {
    console.log(err);
  }
  console.log("load model success");
};

export { loadModel };
