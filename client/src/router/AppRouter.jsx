import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'sonner';

import { Landing } from '../pages/Landing.jsx';
import { Login } from '../pages/Login.jsx';
import { Dashboard } from '../pages/Dashboard.jsx';
import { Customers } from '../pages/Customers.jsx';
import { ProtectedRoute } from '../components/auth/ProtectedRoute.jsx';
import { restoreSession } from '../features/auth/authSlice.js';

/**
 * Root Router component coordinating application navigation paths.
 */
export const AppRouter = () => {
  const dispatch = useDispatch();

  // Try to restore user authentication session from localStorage on mount
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {/* Toast notifier configurations */}
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(12, 12, 20, 0.95)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            color: '#fff',
            borderRadius: '14px',
            boxShadow: '0 20px 60px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)',
          },
        }}
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
