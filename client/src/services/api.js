import axios from 'axios';
import { API_BASE_URL } from '../config/constants.js';

/**
 * Reusable custom Axios instance configured for Churnly API communication.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to dynamically attach the JWT token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration (401) and format network errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors (server unreachable)
    if (!error.response) {
      const networkError = new Error('Network error: Unable to connect to the backend server.');
      networkError.status = 503;
      return Promise.reject(networkError);
    }

    // Handle 401 Unauthorized errors (invalidated/expired tokens)
    if (error.response.status === 401) {
      localStorage.removeItem('token');
    }

    return Promise.reject(error);
  }
);

export default api;
