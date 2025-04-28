const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const resultRoutes = require('./routes/resultRoutes');

// Initialize dotenv for environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection URI from environment variables
const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/myDatabase'; // Default to localhost if not provided

// Connect to MongoDB using Mongoose
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// Use Routes
app.use('/api/v1/user', userRoutes);  // Authentication routes
app.use('/api/v1', resultRoutes);     // Arithmetic operation routes

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
