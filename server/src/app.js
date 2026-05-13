const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// Body parser middleware
app.use(express.json());


// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Server is running' });
});

module.exports = app;
