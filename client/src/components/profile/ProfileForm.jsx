import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';

// Form validation schema using Zod
const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export const ProfileForm = ({ defaultValues, onSubmit, onCancel, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      email: defaultValues?.email || '',
    },
  });

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl border border-white/5 bg-gradient-to-b from-[#0c0c14] to-[#07070a] p-6 shadow-xl shadow-black/40"
    >
      <div>
        <h3 className="text-base font-bold text-white">Edit Profile Details</h3>
        <p className="text-xs text-neutral-400 mt-1">Update your personal account credentials.</p>
      </div>

      {/* Name Input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          disabled={loading}
          className={`w-full rounded-lg border bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder-neutral-500 transition-all focus:outline-none focus:ring-2 ${
            errors.name
              ? 'border-rose-500/50 focus:ring-rose-500/20'
              : 'border-white/5 focus:border-indigo-500/50 focus:ring-indigo-500/20'
          }`}
          placeholder="Your full name"
          {...register('name')}
        />
        {errors.name && (
          <span className="text-[11px] font-medium text-rose-400 block">{errors.name.message}</span>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          disabled={loading}
          className={`w-full rounded-lg border bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder-neutral-500 transition-all focus:outline-none focus:ring-2 ${
            errors.email
              ? 'border-rose-500/50 focus:ring-rose-500/20'
              : 'border-white/5 focus:border-indigo-500/50 focus:ring-indigo-500/20'
          }`}
          placeholder="your.email@example.com"
          {...register('email')}
        />
        {errors.email && (
          <span className="text-[11px] font-medium text-rose-400 block">{errors.email.message}</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-5">
        <button
          type="button"
          disabled={loading}
          onClick={onCancel}
          className="rounded-lg border border-white/5 px-4 py-2 text-xs font-semibold text-neutral-400 transition-all hover:bg-white/5 hover:text-white disabled:opacity-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="relative flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/10 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </span>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </motion.form>
  );
};

export default ProfileForm;
