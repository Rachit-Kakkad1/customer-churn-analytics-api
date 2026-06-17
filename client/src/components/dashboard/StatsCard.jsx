import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/**
 * Reusable statistics card with glassmorphic styling, hover highlights, and trend indicators.
 */
export const StatsCard = ({ title, value, trend, trendDirection = 'up', icon: Icon, description, colorSchema = 'indigo' }) => {
  const isUp = trendDirection === 'up';

  // Tailored color schemes mapping standard border/icon text classes
  const colorMaps = {
    indigo: 'from-indigo-500/10 to-purple-500/10 border-indigo-500/20 text-indigo-400',
    emerald: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-400',
    rose: 'from-rose-500/10 to-orange-500/10 border-rose-500/20 text-rose-400',
    blue: 'from-blue-500/10 to-sky-500/10 border-blue-500/20 text-blue-400',
  };

  const colorClass = colorMaps[colorSchema] || colorMaps.indigo;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[#0c0c14] to-[#07070a] p-6 shadow-xl shadow-black/40 transition-all duration-300 hover:border-white/10"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-white/[0.01] blur-2xl pointer-events-none" />

      {/* Header Row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg border bg-gradient-to-tr ${colorClass}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* Primary Value */}
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-white">{value}</span>
        {trend && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend}
          </span>
        )}
      </div>

      {/* Subtitle Description */}
      {description && (
        <p className="mt-1 text-[11px] text-neutral-500">{description}</p>
      )}
    </motion.div>
  );
};
export default StatsCard;
