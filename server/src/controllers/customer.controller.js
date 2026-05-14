const Customer = require("../models/customer.model");

/**
 * Customer Controller
 * Placeholder functions for customer management
 */

// @desc    Get all customers
// @route   GET /api/customers
// @access  Public
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    // Handle basic customer retrieval error
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single customer by ID
// @route   GET /api/customers/:id
// @access  Public
const getCustomerById = async (req, res) => {
  res.status(200).json({
    success: true,
    message: `Get customer by ID controller for ID: ${req.params.id}`,
  });
};

// @desc    Create new customer
// @route   POST /api/customers
// @access  Private
const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    // Handle basic errors during customer creation
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update customer
// @route   PUT /api/customers/:id
// @access  Private
const updateCustomer = async (req, res) => {
  res.status(200).json({
    success: true,
    message: `Update customer controller for ID: ${req.params.id}`,
  });
};

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Private
const deleteCustomer = async (req, res) => {
  res.status(200).json({
    success: true,
    message: `Delete customer controller for ID: ${req.params.id}`,
  });
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
