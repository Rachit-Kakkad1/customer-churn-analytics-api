import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardLayout } from '../layouts/DashboardLayout.jsx';
import { ProfileCard } from '../components/profile/ProfileCard.jsx';
import { ProfileForm } from '../components/profile/ProfileForm.jsx';
import profileService from '../services/profileService.js';
import { loginSuccess } from '../features/auth/authSlice.js';

export const Profile = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user profile on mount
  const fetchProfile = () => {
    setLoading(true);
    setError(null);
    profileService.getProfile()
      .then((res) => {
        if (res.success && res.data) {
          setUser(res.data);
          // Sync with Redux and local storage
          const token = localStorage.getItem('token') || authState.token;
          dispatch(loginSuccess({ user: { id: res.data._id, name: res.data.name, email: res.data.email }, token }));
        } else {
          throw new Error('Could not retrieve user info.');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        toast.error(err.message || 'Failed to fetch profile.');
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = (formData) => {
    setUpdating(true);
    profileService.updateProfile(formData)
      .then((res) => {
        if (res.success && res.data) {
          setUser(res.data);
          // Sync updated fields with Redux auth slice and localStorage
          const token = localStorage.getItem('token') || authState.token;
          dispatch(loginSuccess({ user: { id: res.data._id, name: res.data.name, email: res.data.email }, token }));
          
          toast.success('Profile credentials updated successfully.');
        } else {
          throw new Error('Update action returned unsuccessful.');
        }
        setUpdating(false);
      })
      .catch((err) => {
        setUpdating(false);
        toast.error(err.message || 'Failed to update profile.');
      });
  };

  const handleCancel = () => {
    // Re-trigger fetch to restore form state values
    fetchProfile();
    toast.info('Modifications cancelled.');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 select-none">
        {/* Headers */}
        <div className="flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400"
          >
            <Sparkles className="h-3 w-3 animate-pulse" />
            Account settings
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-3xl font-bold tracking-tight text-white"
          >
            Operator Profile
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm text-neutral-400"
          >
            Manage profile settings and authentication info.
          </motion.p>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card Skeleton */}
            <div className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[#0c0c14] to-[#07070a] p-6 shadow-xl">
              <div className="flex flex-col items-center gap-4 animate-pulse">
                <div className="h-24 w-24 rounded-full bg-white/5" />
                <div className="h-5 w-32 rounded bg-white/10" />
                <div className="h-4 w-20 rounded bg-white/5" />
              </div>
              <div className="mt-8 space-y-4">
                <div className="h-10 w-full rounded bg-white/5 animate-pulse" />
                <div className="h-10 w-full rounded bg-white/5 animate-pulse" />
              </div>
            </div>
            {/* Form Skeleton */}
            <div className="md:col-span-2 rounded-xl border border-white/5 bg-gradient-to-b from-[#0c0c14] to-[#07070a] p-6 shadow-xl space-y-6 animate-pulse">
              <div className="h-5 w-40 rounded bg-white/10" />
              <div className="space-y-2">
                <div className="h-3 w-16 rounded bg-white/5" />
                <div className="h-10 w-full rounded bg-white/5" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-28 rounded bg-white/5" />
                <div className="h-10 w-full rounded bg-white/5" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <div className="h-8 w-20 rounded bg-white/5" />
                <div className="h-8 w-24 rounded bg-indigo-500/20" />
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-rose-500/15 bg-[#12070a] p-8 text-center shadow-xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-400 mb-4 animate-bounce">
              <span className="text-xl font-bold">!</span>
            </div>
            <h3 className="text-base font-bold text-white">Profile Diagnostics Failure</h3>
            <p className="text-xs text-neutral-400 mt-2 max-w-sm mx-auto leading-relaxed">
              Unable to establish a connection with the user profile database. {error.message || 'Please verify network connection.'}
            </p>
            <button
              onClick={fetchProfile}
              className="mt-5 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-750 transition-all cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <ProfileCard user={user} />
            <div className="md:col-span-2">
              <ProfileForm
                defaultValues={user}
                onSubmit={handleUpdate}
                onCancel={handleCancel}
                loading={updating}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
