import api from './api.js';

/**
 * Retrieve current user system preferences.
 * @returns {Promise<Object>} The server response data containing preferences
 */
export const getPreferences = () => {
  return api.get('/api/user/preferences')
    .then((response) => response.data);
};

/**
 * Update user system preferences.
 * @param {Object} data - Updated preference values
 * @returns {Promise<Object>} The server response data containing updated preferences
 */
export const updatePreferences = (data) => {
  return api.patch('/api/user/preferences', data)
    .then((response) => response.data);
};

export default {
  getPreferences,
  updatePreferences,
};
