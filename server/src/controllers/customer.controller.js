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
    // Copy req.query
    let queryObj = { ...req.query };

    // Fields to exclude from filtering
    const excludeFields = ["page", "limit", "sort"];
    excludeFields.forEach((param) => delete queryObj[param]);

    // Advanced filtering (gt, gte, lt, lte)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    const filters = JSON.parse(queryStr);

    // Sorting
    let sortQuery = {};
    if (req.query.sort) {
      const sortField = req.query.sort;
      if (sortField.startsWith("-")) {
        sortQuery[sortField.substring(1)] = -1;
      } else {
        sortQuery[sortField] = 1;
      }
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const customers = await Customer.find(filters)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: customers,
      page,
      limit,
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
