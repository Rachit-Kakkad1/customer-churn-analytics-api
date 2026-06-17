import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Percent, DollarSign, Activity, Sparkles } from 'lucide-react';
import { DashboardLayout } from '../layouts/DashboardLayout.jsx';
import { StatsCard } from '../components/dashboard/StatsCard.jsx';
import { ChartsPreview } from '../components/dashboard/ChartsPreview.jsx';
import { RecentActivity } from '../components/dashboard/RecentActivity.jsx';
import analyticsService from '../services/analyticsService.js';

/**
 * Enhanced Dashboard Page rendering stats cards summary panels, trend charts, and system logs timeline.
 */
export const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    analyticsService.getAnalytics()
      .then((res) => {
        if (!active) return;
        if (res.success && res.data) {
          const raw = res.data;
          const total = raw.totalCustomers ?? 0;
          const churned = raw.churnedCustomers ?? 0;
          const churnRate = total > 0 ? (churned / total) * 100 : 0;
          const retentionRate = 100 - churnRate;
          // Calculate a simulated premium revenue impact: total customers * average purchases * 8.2 scale
          const revenueImpact = total * (raw.averagePurchases ?? 0) * 8.2;

          setAnalytics({
            totalCustomers: total,
            churnedCustomers: churned,
            churnRate,
            retentionRate,
            revenueImpact,
            averageAge: raw.averageAge ?? 0,
            averagePurchases: raw.averagePurchases ?? 0
          });
        } else {
          throw new Error('Analytics diagnostics payload not standard.');
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const stats = [
    {
      title: 'Total Customers',
      value: loading ? '...' : (analytics?.totalCustomers ?? 0).toLocaleString(),
      trend: '+14.2%',
      trendDirection: 'up',
      description: 'vs previous month',
      icon: Users,
      colorSchema: 'blue',
    },
    {
      title: 'Churn Rate',
      value: loading ? '...' : `${(analytics?.churnRate ?? 0).toFixed(1)}%`,
      trend: '-0.8%',
      trendDirection: 'down',
      description: 'vs previous month',
      icon: Percent,
      colorSchema: 'rose',
    },
    {
      title: 'Retention Rate',
      value: loading ? '...' : `${(analytics?.retentionRate ?? 0).toFixed(1)}%`,
      trend: '+0.5%',
      trendDirection: 'up',
      description: 'vs previous month',
      icon: Activity,
      colorSchema: 'indigo',
    },
    {
      title: 'Revenue Impact',
      value: loading ? '...' : `$${Math.round(analytics?.revenueImpact ?? 0).toLocaleString()}`,
      trend: '+22.5%',
      trendDirection: 'up',
      description: 'projected growth',
      icon: DollarSign,
      colorSchema: 'emerald',
    },
  ];

  const isEmpty = analytics && analytics.totalCustomers === 0;

  return (
    <DashboardLayout>
      <div className="space-y-8 select-none">
        {/* Banner Headers */}
        <div className="flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400"
          >
            <Sparkles className="h-3 w-3 animate-pulse" />
            Overview
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-3xl font-bold tracking-tight text-white"
          >
            Welcome back, Operator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm text-neutral-400"
          >
            Diagnostics overview of the Churnly Analytics Platform.
          </motion.p>
        </div>

        {/* Stats Grid summaries */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }}
            >
              <StatsCard {...stat} loading={loading} error={error} />
            </motion.div>
          ))}
        </div>

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-white/5 bg-gradient-to-br from-[#0c0c14]/50 to-[#07070a]/50 p-12 text-center shadow-xl backdrop-blur-md"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 mb-4 animate-pulse">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-base font-bold text-white">No Customer Records Found</h2>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-2 leading-relaxed">
              The customer telemetry database is currently empty. Please add customer profiles via the customer management panel to populate behavioral intelligence streams.
            </p>
          </motion.div>
        ) : (
          /* Charts and Log Timeline Workspace grids */
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Visual Recharts graphs (take 2/3 width) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="lg:col-span-2"
            >
              <ChartsPreview analyticsData={analytics} loading={loading} error={error} />
            </motion.div>

            {/* Timeline Operational Logs (take 1/3 width) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <RecentActivity />
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
