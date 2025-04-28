const mongoose = require('mongoose');

// Define the Result schema
const resultSchema = new mongoose.Schema({
  num1: Number,
  num2: Number,
  operation: String,
  result: Number,
  createdAt: { type: Date, default: Date.now },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
