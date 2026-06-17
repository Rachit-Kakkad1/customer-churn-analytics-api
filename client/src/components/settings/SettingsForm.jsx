import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';

const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  timezone: z.string().min(1, { message: 'Timezone is required.' }),
  language: z.string().min(1, { message: 'Language is required.' }),
  emailAlerts: z.boolean(),
  marketingEmails: z.boolean(),
});

export const SettingsForm = ({ defaultValues, onSubmit, onReset, loading = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      theme: defaultValues?.theme || 'dark',
      timezone: defaultValues?.timezone || 'UTC',
      language: defaultValues?.language || 'English',
      emailAlerts: defaultValues?.emailAlerts ?? true,
      marketingEmails: defaultValues?.marketingEmails ?? false,
    },
  });

  const handleFormReset = () => {
    reset();
    if (onReset) onReset();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl border border-white/5 bg-gradient-to-b from-[#0c0c14] to-[#07070a] p-6 shadow-xl shadow-black/40"
    >
      <div>
        <h3 className="text-base font-bold text-white">Configure Dashboard Settings</h3>
        <p className="text-xs text-neutral-400 mt-1">Adjust themes, localizations, and automated reporting alerts.</p>
      </div>

      {/* Grid Inputs */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Theme select */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block" htmlFor="theme">
            Preferred Theme
          </label>
          <select
            id="theme"
            disabled={loading}
            className="w-full rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            {...register('theme')}
          >
            <option className="bg-[#0c0c14]" value="dark">Dark Theme</option>
            <option className="bg-[#0c0c14]" value="light">Light Theme</option>
            <option className="bg-[#0c0c14]" value="system">System Default</option>
          </select>
          {errors.theme && (
            <span className="text-[11px] font-medium text-rose-400 block">{errors.theme.message}</span>
          )}
        </div>

        {/* Language select */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block" htmlFor="language">
            Language / Locale
          </label>
          <select
            id="language"
            disabled={loading}
            className="w-full rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            {...register('language')}
          >
            <option className="bg-[#0c0c14]" value="English">English</option>
            <option className="bg-[#0c0c14]" value="Spanish">Español</option>
            <option className="bg-[#0c0c14]" value="French">Français</option>
            <option className="bg-[#0c0c14]" value="German">Deutsch</option>
          </select>
          {errors.language && (
            <span className="text-[11px] font-medium text-rose-400 block">{errors.language.message}</span>
          )}
        </div>

        {/* Timezone Input */}
        <div className="space-y-2 sm:col-span-2">
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block" htmlFor="timezone">
            Timezone Identifier
          </label>
          <input
            id="timezone"
            type="text"
            disabled={loading}
            className={`w-full rounded-lg border bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder-neutral-500 transition-all focus:outline-none focus:ring-2 ${
              errors.timezone
                ? 'border-rose-500/50 focus:ring-rose-500/20'
                : 'border-white/5 focus:border-indigo-500/50 focus:ring-indigo-500/20'
            }`}
            placeholder="e.g. UTC, EST, Europe/London"
            {...register('timezone')}
          />
          {errors.timezone && (
            <span className="text-[11px] font-medium text-rose-400 block">{errors.timezone.message}</span>
          )}
        </div>
      </div>

      {/* Checkboxes Alerts */}
      <div className="border-t border-white/5 pt-5 space-y-4">
        <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">Communication Alerts</h4>
        
        {/* Email alerts */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            disabled={loading}
            className="mt-0.5 rounded border-white/10 bg-white/[0.02] text-indigo-600 focus:ring-indigo-500/20 h-4 w-4"
            {...register('emailAlerts')}
          />
          <div>
            <span className="text-xs font-medium text-neutral-200 group-hover:text-white transition-all">Enable Email Alerts</span>
            <p className="text-[10px] text-neutral-500 mt-0.5">Receive immediate reports on customer retention risk breaches.</p>
          </div>
        </label>

        {/* Marketing emails */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            disabled={loading}
            className="mt-0.5 rounded border-white/10 bg-white/[0.02] text-indigo-600 focus:ring-indigo-500/20 h-4 w-4"
            {...register('marketingEmails')}
          />
          <div>
            <span className="text-xs font-medium text-neutral-200 group-hover:text-white transition-all">Receive Weekly Digests</span>
            <p className="text-[10px] text-neutral-500 mt-0.5">Get a compiled digest of system analytics and churn curves.</p>
          </div>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-5">
        <button
          type="button"
          disabled={loading}
          onClick={handleFormReset}
          className="rounded-lg border border-white/5 px-4 py-2 text-xs font-semibold text-neutral-400 transition-all hover:bg-white/5 hover:text-white disabled:opacity-50 cursor-pointer"
        >
          Reset
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

export default SettingsForm;
