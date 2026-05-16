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
    const filters = {};

    // Basic filtering
    if (req.query.country) {
      filters.country = req.query.country;
    }

    if (req.query.gender) {
      filters.gender = req.query.gender;
    }

    if (req.query.churned) {
      filters.churned = req.query.churned;
    }

    if (req.query.city) {
      filters.city = req.query.city;
    }

    const customers = await Customer.find(filters);

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
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    // Handle basic customer retrieval by ID error
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    // Handle basic customer update error
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Private
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "Customer deleted successfully",
    });
  } catch (error) {
    // Handle basic customer deletion error
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
