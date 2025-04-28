const Result = require('../models/resultModel');

// Perform calculation and store the result
exports.performCalculation = async (req, res) => {
  const { num1, num2, operation } = req.body;

  // Input validation
  if (num1 === undefined || num2 === undefined || !operation) {
    return res.status(400).json({ error: 'Please provide num1, num2, and operation.' });
  }

  let result;

  // Perform the arithmetic operation based on the operation provided
  switch (operation.toLowerCase()) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      if (num2 === 0) {
        return res.status(400).json({ error: 'Division by zero is not allowed.' });
      }
      result = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation. Please use add, subtract, multiply, or divide.' });
  }

  // Store the result in MongoDB
  try {
    const newResult = new Result({
      num1,
      num2,
      operation,
      result,
    });

    // Save the result to the database
    await newResult.save();

    // Send the result back in the response
    res.json({ result });
  } catch (err) {
    console.error('Error saving result:', err);
    res.status(500).json({ error: 'An error occurred while saving the result.' });
  }

  // Get all calculation results
exports.getAllResults = async (req, res) => {
    try {
      const results = await Result.find().sort({ createdAt: -1 }); // Optional: sort by latest
      res.json(results);
    } catch (err) {
      console.error('Error fetching results:', err);
      res.status(500).json({ error: 'An error occurred while fetching the results.' });
    }
  };
  
};
