const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// Sample training data
const data = [
  { description: 'buy milk', category: 'Groceries' },
  { description: 'uber ride', category: 'Transport' },
  { description: 'electricity bill', category: 'Utilities' },
  { description: 'amazon purchase', category: 'Shopping' },
];

// Preprocess text into numbers
const categories = [...new Set(data.map(d => d.category))];
const categoryToIndex = Object.fromEntries(categories.map((cat, idx) => [cat, idx]));

const descriptions = data.map(d => d.description);
const labels = data.map(d => categoryToIndex[d.category]);

// Simple tokenizer
const vocab = [...new Set(descriptions.join(' ').toLowerCase().split(' '))];
const wordToIndex = Object.fromEntries(vocab.map((word, idx) => [word, idx + 1]));

function encode(desc) {
  const tokens = desc.toLowerCase().split(' ');
  return tokens.map(word => wordToIndex[word] || 0);
}

const xs = tf.tensor2d(descriptions.map(d => {
  const encoded = encode(d);
  return [...encoded, 0, 0].slice(0, 3); // Padding/truncating to length 3
}));

const ys = tf.tensor1d(labels, 'int32');
const ysOneHot = tf.oneHot(ys, categories.length);

// Define model
let model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [3], units: 16, activation: 'relu' }));
model.add(tf.layers.dense({ units: categories.length, activation: 'softmax' }));
model.compile({ loss: 'categoricalCrossentropy', optimizer: 'adam', metrics: ['accuracy'] });

(async () => {
  await model.fit(xs, ysOneHot, { epochs: 100 });
  await model.save('file://./ml-model');
  console.log('✅ Model trained and saved');
})();
