import api from './api.js';

/**
 * Retrieve behavioral analytics and customer trends summaries.
 * @returns {Promise<Object>} The server response data containing aggregated metrics
 */
export const getAnalytics = () => {
  return api.get('/api/customers/analytics')
    .then((response) => response.data);
};

export default {
  getAnalytics,
};
