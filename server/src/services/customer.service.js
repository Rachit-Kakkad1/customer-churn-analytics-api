const Customer = require("../models/customer.model");

/**
 * Customer Service
 * Handles data access and business logic for customer-related operations
 */

const getAllCustomers = async (queryParams) => {
  let queryObj = { ...queryParams };

  // Fields to exclude from filtering
  const excludeFields = ["page", "limit", "sort", "fields", "search"];
  excludeFields.forEach((param) => delete queryObj[param]);

  // Advanced filtering (gt, gte, lt, lte)
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

  const filters = JSON.parse(queryStr);

  // Search functionality
  if (queryParams.search) {
    filters.$or = [
      { name: { $regex: queryParams.search, $options: "i" } },
      { email: { $regex: queryParams.search, $options: "i" } },
      { country: { $regex: queryParams.search, $options: "i" } },
      { city: { $regex: queryParams.search, $options: "i" } },
    ];
  }

  // Sorting
  let sortQuery = {};
  if (queryParams.sort) {
    const sortField = queryParams.sort;
    if (sortField.startsWith("-")) {
      sortQuery[sortField.substring(1)] = -1;
    } else {
      sortQuery[sortField] = 1;
    }
  }

  // Field selection (Projection)
  let selectFields = "";
  if (queryParams.fields) {
    selectFields = queryParams.fields.split(",").join(" ");
  }

  // Pagination
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const skip = (page - 1) * limit;

  const customers = await Customer.find(filters)
    .sort(sortQuery)
    .select(selectFields)
    .skip(skip)
    .limit(limit);

  return { customers, page, limit };
};

const getCustomerById = async (id) => {
  return await Customer.findById(id);
};

const createCustomer = async (data) => {
  return await Customer.create(data);
};

const updateCustomer = async (id, data) => {
  return await Customer.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteCustomer = async (id) => {
  return await Customer.findByIdAndDelete(id);
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
