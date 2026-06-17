import React from 'react';
import { motion } from 'framer-motion';
import { Users, Percent, DollarSign, Activity, Sparkles } from 'lucide-react';
import { DashboardLayout } from '../layouts/DashboardLayout.jsx';
import { StatsCard } from '../components/dashboard/StatsCard.jsx';
import { ChartsPreview } from '../components/dashboard/ChartsPreview.jsx';
import { RecentActivity } from '../components/dashboard/RecentActivity.jsx';

/**
 * Enhanced Dashboard Page rendering stats cards summary panels, trend charts, and system logs timeline.
 */
export const Dashboard = () => {
  const stats = [
    {
      title: 'Total Customers',
      value: '12,842',
      trend: '+14.2%',
      trendDirection: 'up',
      description: 'vs previous month',
      icon: Users,
      colorSchema: 'blue',
    },
    {
      title: 'Churn Rate',
      value: '2.4%',
      trend: '-0.8%',
      trendDirection: 'down',
      description: 'vs previous month',
      icon: Percent,
      colorSchema: 'rose',
    },
    {
      title: 'Retention Rate',
      value: '97.6%',
      trend: '+0.5%',
      trendDirection: 'up',
      description: 'vs previous month',
      icon: Activity,
      colorSchema: 'indigo',
    },
    {
      title: 'Revenue Impact',
      value: '$420,800',
      trend: '+22.5%',
      trendDirection: 'up',
      description: 'projected growth',
      icon: DollarSign,
      colorSchema: 'emerald',
    },
  ];

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
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Charts and Log Timeline Workspace grids */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Visual Recharts graphs (take 2/3 width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="lg:col-span-2"
          >
            <ChartsPreview />
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
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
