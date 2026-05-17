const express = require('express');
const router = express.Router();
const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerAnalytics,
} = require('../controllers/customer.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  createCustomerSchema,
  updateCustomerSchema,
} = require('../validators/customer.validator');

/**
 * Customer Management Routes
 * 
 * This file defines the routing structure for customer-related operations.
 */

/**
 * @route   GET /api/customers/analytics
 * @desc    Get customer analytics
 * @access  Private
 */
router.get('/analytics', authMiddleware, getCustomerAnalytics);

/**
 * @route   GET /api/customers
 * @desc    Get all customers
 * @access  Public
 */
router.get('/', getAllCustomers);

/**
 * @route   GET /api/customers/:id
 * @desc    Get a single customer by ID
 * @access  Public
 */
router.get('/:id', getCustomerById);

/**
 * @route   POST /api/customers
 * @desc    Create a new customer
 * @access  Private
 */
router.post('/', authMiddleware, validate(createCustomerSchema), createCustomer);

/**
 * @route   PATCH /api/customers/:id
 * @desc    Update an existing customer
 * @access  Private
 */
router.patch('/:id', authMiddleware, validate(updateCustomerSchema), updateCustomer);

/**
 * @route   DELETE /api/customers/:id
 * @desc    Delete a customer record
 * @access  Private
 */
router.delete('/:id', authMiddleware, deleteCustomer);

module.exports = router;
