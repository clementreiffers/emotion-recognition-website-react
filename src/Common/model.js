import * as tf from "@tensorflow/tfjs";

const loadModel = async (link: string, setModel: Function) => {
  try {
    if (typeof model === "undefined") {
      const fetchModel = await tf.loadLayersModel(link);
      setModel(fetchModel);
      console.log("load model success");
    }
  } catch (err) {
    console.log(err);
  }
};

export { loadModel };
