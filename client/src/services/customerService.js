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

export default {
  getCustomers,
};
