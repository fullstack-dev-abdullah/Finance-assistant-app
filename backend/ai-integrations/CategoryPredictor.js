const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");

// Same vocab and category mapping from training (must keep consistent!)
let categories = ["Groceries", "Transport", "Utilities", "Shopping"];
let categoryToIndex = Object.fromEntries(
  categories.map((cat, idx) => [cat, idx])
);
let wordToIndex = {}; // Build this from vocab used in training

// If you have vocab saved or you can rebuild it:
let vocab = [
  "buy",
  "milk",
  "uber",
  "ride",
  "electricity",
  "bill",
  "amazon",
  "purchase",
];
vocab.forEach((word, idx) => {
  wordToIndex[word] = idx + 1;
});

function encode(desc) {
  let tokens = desc.toLowerCase().split(" ");
  return tokens.map((word) => wordToIndex[word] || 0);
}

// Load model once when server starts
let model;
async function loadModel() {
  model = await tf.loadLayersModel("file://./ml-model/model.json");
}
loadModel();

// Predict function
async function predictCategory(description) {
  let encoded = encode(description);
  // Pad or truncate to length 3
  let inputArr = [...encoded, 0, 0].slice(0, 3);
  let inputTensor = tf.tensor2d([inputArr]); // shape [1,3]

  let prediction = model.predict(inputTensor);
  let predictedIndex = prediction.argMax(-1).dataSync()[0];
  inputTensor.dispose();
  prediction.dispose();

  return categories[predictedIndex];
}

module.exports = { predictCategory };
