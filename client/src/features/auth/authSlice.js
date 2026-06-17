import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

/**
 * Authentication Slice for managing global user session and auth states.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Triggers loading indicator on login attempt
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Saves user credentials and token on successful login
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;

      // Sync state to localStorage for persistence
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
      }
      if (action.payload.user) {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    // Handles login failure by cleaning up credentials and saving the error message
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;

      // Clear persisted state on authentication failure
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    // Clears credentials and active session
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      // Remove credentials from storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    // Restores user session from localStorage if credentials exist
    restoreSession: (state) => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        try {
          state.token = token;
          state.user = JSON.parse(userStr);
          state.isAuthenticated = true;
          state.error = null;
        } catch (e) {
          // Clean up if JSON parse failed or data is corrupted
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, restoreSession } = authSlice.actions;

export default authSlice.reducer;
