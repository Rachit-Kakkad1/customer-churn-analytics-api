import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Users, Percent, DollarSign, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';
import { DashboardLayout } from '../layouts/DashboardLayout.jsx';

/**
 * Primary Dashboard Landing Screen.
 * Renders stats summary grid cards and coming soon status containers.
 */
export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  // Split name for greeting
  const firstName = user?.name ? user.name.split(' ')[0] : 'there';

  const stats = [
    {
      title: 'Total Customers',
      value: '12,842',
      change: '+14.2%',
      trend: 'up',
      description: 'vs previous month',
      icon: Users,
      color: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-400',
    },
    {
      title: 'Churn Rate',
      value: '2.4%',
      change: '-0.8%',
      trend: 'down',
      description: 'vs previous month',
      icon: Percent,
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-400',
    },
    {
      title: 'Customer Lifetime Value',
      value: '$420,800',
      change: '+22.5%',
      trend: 'up',
      description: 'projected growth',
      icon: DollarSign,
      color: 'from-violet-500/10 to-purple-500/10 border-violet-500/20 text-violet-400',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Banner Headers */}
        <div className="flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400"
          >
            <Sparkles className="h-3 w-3" />
            Overview
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-3xl font-bold tracking-tight text-white"
          >
            Welcome back, {firstName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm text-neutral-400"
          >
            Here is a snapshot of Churnly Analytics Platform diagnostics.
          </motion.p>
        </div>

        {/* Stats Grid Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const IsUp = stat.trend === 'up';

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.05 }}
                className={`relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[#0c0c14] to-[#07070a] p-6 shadow-xl shadow-black/40`}
              >
                {/* Visual Ambient Glow */}
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-white/[0.01] blur-2xl" />

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">{stat.title}</span>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg border bg-gradient-to-tr ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold tracking-tight text-white">{stat.value}</span>
                  <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${IsUp ? 'text-emerald-400' : 'text-indigo-400'}`}>
                    {IsUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.change}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-neutral-500">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Placeholder Coming Soon Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-[#0c0c14] to-[#07070a] p-12 text-center shadow-xl shadow-black/40"
        >
          {/* Ambient Background Lights */}
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.02] blur-3xl" />

          <div className="relative z-10 flex flex-col items-center gap-4 max-w-sm mx-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] text-indigo-400 shadow-inner">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <h2 className="text-xl font-semibold text-white tracking-tight">Analytics Overview</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We are finalizing our advanced machine learning predictive models. Once ready, custom visual insights and customer churn distributions will populate here.
            </p>
            <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-medium text-indigo-400 border border-indigo-500/15">
              Coming Soon
            </span>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};
export default Dashboard;
