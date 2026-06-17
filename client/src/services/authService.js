import api from './api.js';

/**
 * Authentication service helper methods for communicating with backend auth endpoints.
 */

/**
 * Register a new user
 * @param {Object} data - The user registration details (name, email, password, role)
 * @returns {Promise<Object>} The server response data
 */
export const register = (data) => {
  return api.post('/api/auth/register', data)
    .then((response) => response.data);
};

/**
 * Log in a user and store their authentication token
 * @param {Object} credentials - The user credentials (email, password)
 * @returns {Promise<Object>} The server response data containing token and user info
 */
export const login = (credentials) => {
  return api.post('/api/auth/login', credentials)
    .then((response) => {
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
      }
      return response.data;
    });
};

/**
 * Fetch the current user's profile information
 * @returns {Promise<Object>} The user profile data
 */
export const getProfile = () => {
  return api.get('/api/auth/profile')
    .then((response) => response.data);
};

/**
 * Log out the current user and clear local credentials
 * @returns {Promise<Object>} The server response data
 */
export const logout = () => {
  return api.get('/api/auth/logout')
    .then((response) => {
      localStorage.removeItem('token');
      return response.data;
    })
    .catch((error) => {
      // Ensure local token is cleared even if remote call fails (e.g., expired session)
      localStorage.removeItem('token');
      throw error;
    });
};
