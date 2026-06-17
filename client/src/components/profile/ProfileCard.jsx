import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield, Calendar } from 'lucide-react';

export const ProfileCard = ({ user }) => {
  if (!user) return null;

  // Format member since date
  const memberSince = user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown';

  // Get initial for avatar
  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[#0c0c14] to-[#07070a] p-6 shadow-xl shadow-black/40 backdrop-blur-md"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-indigo-500/[0.02] blur-3xl pointer-events-none" />

      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-indigo-500/20 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 text-3xl font-bold text-indigo-400 shadow-inner">
          {initial}
          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white border-2 border-[#07070a]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
        </div>

        {/* User Info */}
        <h2 className="mt-4 text-xl font-bold text-white tracking-tight">{user.name || 'Churnly Operator'}</h2>
        <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-indigo-500/10 bg-indigo-500/5 px-2.5 py-0.5 text-xs font-medium text-indigo-400">
          <Shield className="h-3 w-3" />
          {user.role || 'Operator'}
        </span>

        {/* Divider */}
        <div className="my-6 w-full border-b border-white/5" />

        {/* Detail Rows */}
        <div className="w-full space-y-4 text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-neutral-400">
              <Mail className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Email Address</p>
              <p className="text-sm text-neutral-200 truncate">{user.email || 'operator@churnly.com'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-neutral-400">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Member Since</p>
              <p className="text-sm text-neutral-200">{memberSince}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
