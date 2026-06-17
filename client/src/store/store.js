import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';

/**
 * Configure and initialize the global Redux store.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
