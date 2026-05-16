const express = require('express');
const router = express.Router();
const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customer.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * Customer Management Routes
 * 
 * This file defines the routing structure for customer-related operations.
 * It includes endpoints for retrieving, creating, updating, and deleting
 * customer records.
 */

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
router.post('/', authMiddleware, createCustomer);

/**
 * @route   PATCH /api/customers/:id
 * @desc    Update an existing customer
 * @access  Private
 */
router.patch('/:id', authMiddleware, updateCustomer);

/**
 * @route   DELETE /api/customers/:id
 * @desc    Delete a customer record
 * @access  Private
 */
router.delete('/:id', authMiddleware, deleteCustomer);

module.exports = router;
