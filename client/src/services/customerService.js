import api from './api.js';

/**
 * Customer service helper methods for communicating with backend customer endpoints.
 */

/**
 * Fetch all customers from the backend database with sorting, pagination, search, and filtering options.
 * @param {Object} params - Query parameters to pass to the API
 * @returns {Promise<Object>} The server response data containing customers and pagination metadata
 */
export const getCustomers = (params = {}) => {
  const queryParams = { ...params };

  // Map status filters to backend churned boolean
  if (queryParams.status) {
    if (queryParams.status === 'active') {
      queryParams.churned = false;
    } else if (queryParams.status === 'danger') {
      queryParams.churned = true;
    }
    // Remove status to match database schema constraints
    delete queryParams.status;
  }

  return api.get('/api/customers', { params: queryParams })
    .then((response) => response.data);
};

/**
 * Add a new customer record to the database
 * @param {Object} data - Customer record attributes
 * @returns {Promise<Object>} The server response data
 */
export const createCustomer = (data) => {
  const payload = {
    ...data,
    city: data.city || 'Default City',
    membershipYears: Number(data.membershipYears) || 1,
    signupQuarter: data.signupQuarter || 'Q1',
    lifetimeValue: Number(data.lifetimeValue) || Math.floor(Math.random() * 4000) + 1000,
    age: Number(data.age),
  };

  // Map status to churned property
  if (payload.status) {
    payload.churned = payload.status === 'danger' || payload.status === 'churned';
    delete payload.status;
  }

  // Strip fields not recognized by the strict Joi backend validator
  delete payload.name;
  delete payload.email;

  return api.post('/api/customers', payload)
    .then((response) => response.data);
};

/**
 * Update an existing customer record by ID
 * @param {string} id - The customer document ID
 * @param {Object} data - Updated customer attributes
 * @returns {Promise<Object>} The server response data
 */
export const updateCustomer = (id, data) => {
  const payload = { ...data };

  if (payload.age !== undefined) payload.age = Number(payload.age);
  if (payload.lifetimeValue !== undefined) payload.lifetimeValue = Number(payload.lifetimeValue);
  if (payload.membershipYears !== undefined) payload.membershipYears = Number(payload.membershipYears);

  // Map status to churned property
  if (payload.status) {
    payload.churned = payload.status === 'danger' || payload.status === 'churned';
    delete payload.status;
  }

  // Strip fields not recognized by the strict Joi backend validator
  delete payload.name;
  delete payload.email;

  return api.patch(`/api/customers/${id}`, payload)
    .then((response) => response.data);
};

/**
 * Remove a customer record from the database by ID
 * @param {string} id - The customer document ID
 * @returns {Promise<Object>} The server response data
 */
export const deleteCustomer = (id) => {
  return api.delete(`/api/customers/${id}`)
    .then((response) => response.data);
};

export default {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
