import React from 'react';
import { motion } from 'framer-motion';
import { SunMoon, Globe, Clock, BellRing } from 'lucide-react';

export const PreferenceCard = ({ preferences }) => {
  if (!preferences) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[#0c0c14] to-[#07070a] p-6 shadow-xl shadow-black/40 backdrop-blur-md"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-indigo-500/[0.02] blur-3xl pointer-events-none" />

      <div>
        <h2 className="text-base font-bold text-white tracking-tight">Active Preferences</h2>
        <p className="text-xs text-neutral-400 mt-1">Operational environment configuration.</p>
        
        {/* Divider */}
        <div className="my-5 w-full border-b border-white/5" />

        {/* Display grids */}
        <div className="space-y-4">
          {/* Theme */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-neutral-400">
              <SunMoon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">System Theme</p>
              <p className="text-sm text-neutral-200 capitalize">{preferences.theme || 'dark'}</p>
            </div>
          </div>

          {/* Language */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-neutral-400">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Locale Language</p>
              <p className="text-sm text-neutral-200 capitalize">{preferences.language || 'English'}</p>
            </div>
          </div>

          {/* Timezone */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-neutral-400">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Preferred Timezone</p>
              <p className="text-sm text-neutral-200">{preferences.timezone || 'UTC'}</p>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-neutral-400">
              <BellRing className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Email Notifications</p>
              <p className={`text-sm font-medium ${preferences.emailAlerts ? 'text-indigo-400' : 'text-neutral-500'}`}>
                {preferences.emailAlerts ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PreferenceCard;
