const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const loggerMiddleware = require('./middlewares/logger.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// Enable CORS
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:3000'].filter(Boolean);
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

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
