import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardLayout } from '../layouts/DashboardLayout.jsx';
import { PreferenceCard } from '../components/settings/PreferenceCard.jsx';
import { SettingsForm } from '../components/settings/SettingsForm.jsx';
import settingsService from '../services/settingsService.js';

export const Settings = () => {
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const fetchPreferences = () => {
    setLoading(true);
    setError(null);
    settingsService.getPreferences()
      .then((res) => {
        if (res.success && res.data) {
          setPreferences(res.data);
        } else {
          throw new Error('Malformed preferences response.');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        toast.error(err.message || 'Failed to fetch preferences.');
      });
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  const handleUpdate = (formData) => {
    setUpdating(true);
    settingsService.updatePreferences(formData)
      .then((res) => {
        if (res.success && res.data) {
          setPreferences(res.data);
          toast.success('Preferences updated successfully.');
        } else {
          throw new Error('Update returned unsuccessful.');
        }
        setUpdating(false);
      })
      .catch((err) => {
        setUpdating(false);
        toast.error(err.message || 'Failed to save preferences.');
      });
  };

  const handleReset = () => {
    fetchPreferences();
    toast.info('Preferences re-synced.');
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
            System Control
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-3xl font-bold tracking-tight text-white"
          >
            System Settings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm text-neutral-400"
          >
            Manage regional formats, notification alerts, and aesthetic preferences.
          </motion.p>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card Skeleton */}
            <div className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[#0c0c14] to-[#07070a] p-6 shadow-xl space-y-4">
              <div className="h-5 w-32 rounded bg-white/10 animate-pulse" />
              <div className="h-3 w-48 rounded bg-white/5 animate-pulse" />
              <div className="my-5 border-b border-white/5" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-white/5 animate-pulse" />
                  <div className="space-y-1">
                    <div className="h-2 w-16 bg-white/5 rounded animate-pulse" />
                    <div className="h-3.5 w-24 bg-white/10 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
            {/* Form Skeleton */}
            <div className="md:col-span-2 rounded-xl border border-white/5 bg-gradient-to-b from-[#0c0c14] to-[#07070a] p-6 shadow-xl space-y-6 animate-pulse">
              <div className="h-5 w-48 rounded bg-white/10" />
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="h-3 w-20 rounded bg-white/5" />
                  <div className="h-10 w-full rounded bg-white/5" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded bg-white/5" />
                  <div className="h-10 w-full rounded bg-white/5" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <div className="h-3 w-28 rounded bg-white/5" />
                  <div className="h-10 w-full rounded bg-white/5" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <div className="h-8 w-16 rounded bg-white/5" />
                <div className="h-8 w-24 rounded bg-indigo-500/20" />
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-rose-500/15 bg-[#12070a] p-8 text-center shadow-xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-400 mb-4 animate-bounce">
              <span className="text-xl font-bold">!</span>
            </div>
            <h3 className="text-base font-bold text-white">Settings Diagnostics Failure</h3>
            <p className="text-xs text-neutral-400 mt-2 max-w-sm mx-auto leading-relaxed">
              Unable to establish a connection with the system preference database. {error.message || 'Please verify network connection.'}
            </p>
            <button
              onClick={fetchPreferences}
              className="mt-5 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-750 transition-all cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <PreferenceCard preferences={preferences} />
            <div className="md:col-span-2">
              <SettingsForm
                defaultValues={preferences}
                onSubmit={handleUpdate}
                onReset={handleReset}
                loading={updating}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Settings;
