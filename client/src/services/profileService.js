import api from './api.js';

/**
 * Retrieve current logged in user profile.
 * @returns {Promise<Object>} The server response data containing user profile
 */
export const getProfile = () => {
  return api.get('/api/auth/profile')
    .then((response) => response.data);
};

/**
 * Update current logged in user profile.
 * @param {Object} data - Profile updates (e.g. name, email)
 * @returns {Promise<Object>} The server response data containing updated user
 */
export const updateProfile = (data) => {
  return api.patch('/api/auth/profile', data)
    .then((response) => response.data);
};

export default {
  getProfile,
  updateProfile,
};
