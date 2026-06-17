import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Activity, DollarSign } from 'lucide-react';

// Mock timeline dataset for trends mapping Jan-Jun
/**
 * Custom glassmorphic tooltip styling matching our premium dark system.
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-white/5 bg-[#0c0c14]/90 p-3 shadow-xl backdrop-blur-md select-none">
        <p className="text-[10px] font-semibold text-neutral-400 mb-1.5">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs font-medium flex items-center gap-1.5" style={{ color: entry.color }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span>{entry.name}:</span>
            <span className="font-bold text-white">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * ChartsPreview displays retention, churn and revenue trends with premium SVGs.
 */
export const ChartsPreview = ({ analyticsData, loading = false, error = null }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="rounded-xl border border-white/5 bg-gradient-to-b from-[#0c0c14] to-[#07070a] p-6 shadow-xl shadow-black/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-5 mb-6">
          <div className="space-y-2">
            <div className="h-5 w-48 rounded bg-white/10 animate-pulse" />
            <div className="h-3.5 w-64 rounded bg-white/5 animate-pulse" />
          </div>
          <div className="h-8 w-32 rounded bg-white/5 animate-pulse" />
        </div>
        <div className="h-72 w-full flex items-end gap-4 justify-between px-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-white/[0.03] border-t border-indigo-500/20 rounded-t animate-pulse" 
                style={{ height: `${30 + (i % 3) * 20}%` }} 
              />
              <div className="h-3 w-8 rounded bg-white/5 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-500/10 bg-gradient-to-b from-[#12070a] to-[#07070a] p-6 shadow-xl shadow-black/40 flex flex-col items-center justify-center h-[396px] text-center">
        <div className="h-12 w-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4 animate-bounce">
          <TrendingUp className="h-6 w-6 transform rotate-180" />
        </div>
        <h3 className="text-sm font-semibold text-white">Diagnostics Stream Unavailable</h3>
        <p className="text-xs text-neutral-400 mt-1 max-w-xs leading-relaxed">
          {error.message || 'Unable to connect to the analytics compilation service.'}
        </p>
      </div>
    );
  }

  const monthlyTrendData = [
    { month: 'Jan', retention: 98.2, churn: 1.8, revenue: 310 },
    { month: 'Feb', retention: 97.9, churn: 2.1, revenue: 335 },
    { month: 'Mar', retention: 98.5, churn: 1.5, revenue: 360 },
    { month: 'Apr', retention: 97.2, churn: 2.8, revenue: 385 },
    { month: 'May', retention: 98.8, churn: 1.2, revenue: 410 },
    {
      month: 'Jun',
      retention: analyticsData?.retentionRate !== undefined ? Number(analyticsData.retentionRate.toFixed(1)) : 97.6,
      churn: analyticsData?.churnRate !== undefined ? Number(analyticsData.churnRate.toFixed(1)) : 2.4,
      revenue: analyticsData?.revenueImpact !== undefined ? Math.round(analyticsData.revenueImpact / 1000) : 420,
    },
  ];

  return (
    <div className="rounded-xl border border-white/5 bg-gradient-to-b from-[#0c0c14] to-[#07070a] p-6 shadow-xl shadow-black/40">
      {/* Chart Header controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-5 mb-6">
        <div>
          <h2 className="text-base font-bold text-white">Diagnostics & Analytics</h2>
          <p className="text-xs text-neutral-500">Historical performance breakdown.</p>
        </div>
        
        {/* Navigation tabs */}
        <div className="flex rounded-lg border border-white/5 bg-white/[0.02] p-1 self-start">
          <button
            onClick={() => setActiveTab('overview')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${activeTab === 'overview' ? 'bg-white/5 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${activeTab === 'revenue' ? 'bg-white/5 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            Revenue Impact
          </button>
        </div>
      </div>

      {/* Render selected view */}
      <div className="h-72 w-full text-xs">
        {activeTab === 'overview' ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#525252" />
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} stroke="#525252" />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1 }} />
              <Area
                name="Retention Rate (%)"
                type="monotone"
                dataKey="retention"
                stroke="#818cf8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRetention)"
              />
              <Area
                name="Churn Rate (%)"
                type="monotone"
                dataKey="churn"
                stroke="#f43f5e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorChurn)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrendData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#525252" />
              <YAxis domain={[250, 450]} tickFormatter={(val) => `$${val}k`} tickLine={false} axisLine={false} stroke="#525252" />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1 }} />
              <Line
                name="Recurring Revenue ($k)"
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ stroke: '#10b981', strokeWidth: 2, fill: '#07070a', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
export default ChartsPreview;
