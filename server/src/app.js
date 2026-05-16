const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const loggerMiddleware = require('./middlewares/logger.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// Body parser middleware
app.use(express.json());

// Logger middleware
app.use(loggerMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Server is running' });
});

// Error middleware (Should be last)
app.use(errorMiddleware);

module.exports = app;
