import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'sonner';

import { Landing } from '../pages/Landing.jsx';
import { Login } from '../pages/Login.jsx';
import { ProtectedRoute } from '../components/auth/ProtectedRoute.jsx';
import { restoreSession } from '../features/auth/authSlice.js';
import { DashboardLayout } from '../layouts/DashboardLayout.jsx';

// Lazy loaded page components
const Dashboard = lazy(() => import('../pages/Dashboard.jsx'));
const Customers = lazy(() => import('../pages/Customers.jsx'));
const Profile = lazy(() => import('../pages/Profile.jsx'));
const Settings = lazy(() => import('../pages/Settings.jsx'));

/**
 * Premium placeholder for modules under construction
 */
const ComingSoon = ({ title }) => (
  <DashboardLayout>
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center select-none animate-fade-in">
      <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-white mb-2">{title}</h1>
      <p className="text-sm text-neutral-400 max-w-sm">This module is currently under development. Check back soon for updates!</p>
    </div>
  </DashboardLayout>
);

/**
 * Simple animated page loader to show during bundle resolution
 */
const PageLoader = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-[#07070a] text-neutral-400">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">Loading...</span>
    </div>
  </div>
);

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

      <Suspense fallback={<PageLoader />}>
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
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <ComingSoon title="Analytics Overview" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

