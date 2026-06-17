import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight, ArrowDownRight, Activity, Zap, BrainCircuit,
  TrendingUp, Users, ShieldCheck, Bell,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const chartBars = [34, 55, 45, 72, 58, 80, 66, 91, 74, 85, 62, 78, 55, 88, 70, 95, 77, 83];

export const DashboardPreview = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative w-full mt-10 perspective-[2000px]"
    >
      {/* Floating glow behind card */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-transparent blur-3xl -z-10 scale-105" />

      <motion.div
        animate={{ rotateX: [1, -1.5, 1], rotateY: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="w-full bg-[#0b0b12]/90 backdrop-blur-3xl rounded-3xl border border-white/[0.08] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.04)] p-5 relative overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Top shimmer */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600/30 to-violet-600/30 border border-blue-500/20 flex items-center justify-center">
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-white/90 tracking-wide">Live Intelligence</p>
              <p className="text-[9px] text-white/35 uppercase tracking-[0.15em]">Global overview</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-4 h-4 text-white/30" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1], boxShadow: ["0 0 6px rgba(52,211,153,0.8)", "0 0 2px rgba(52,211,153,0.2)", "0 0 6px rgba(52,211,153,0.8)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Retention Card */}
          <motion.div variants={item} className="bg-white/[0.025] border border-white/[0.05] rounded-2xl p-3.5 hover:bg-white/[0.04] transition-colors group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">Retention</span>
              <ShieldCheck className="w-3 h-3 text-emerald-400/60" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold tracking-tighter text-white">92.3%</span>
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5 mb-0.5">
                <ArrowUpRight className="w-3 h-3" />+12%
              </span>
            </div>
            <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "92%" }}
                transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              />
            </div>
          </motion.div>

          {/* Revenue Risk Card */}
          <motion.div variants={item} className="bg-white/[0.025] border border-white/[0.05] rounded-2xl p-3.5 hover:bg-white/[0.04] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">Revenue Risk</span>
              <TrendingUp className="w-3 h-3 text-red-400/60" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold tracking-tighter text-red-400">$124k</span>
              <span className="text-[10px] font-bold text-red-400 flex items-center gap-0.5 mb-0.5">
                <ArrowDownRight className="w-3 h-3" />-4%
              </span>
            </div>
            <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "35%" }}
                transition={{ delay: 1.0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
              />
            </div>
          </motion.div>

          {/* LTV */}
          <motion.div variants={item} className="bg-white/[0.025] border border-white/[0.05] rounded-2xl p-3.5">
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/40 block mb-2">Avg LTV</span>
            <span className="text-xl font-bold tracking-tighter">$2,847</span>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-2.5 h-2.5 text-blue-400" />
              <span className="text-[9px] text-blue-400 font-bold">+8.2%</span>
            </div>
          </motion.div>

          {/* At Risk */}
          <motion.div variants={item} className="bg-white/[0.025] border border-white/[0.05] rounded-2xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">At Risk</span>
              <Users className="w-3 h-3 text-amber-400/60" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-amber-400">2,341</span>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-2.5 h-2.5 text-amber-400" />
              <span className="text-[9px] text-amber-400 font-bold">+3.1%</span>
            </div>
          </motion.div>

          {/* AI Panel */}
          <motion.div
            variants={item}
            className="col-span-2 bg-gradient-to-br from-violet-600/10 to-blue-600/5 border border-violet-500/[0.15] rounded-2xl p-3.5 flex items-start gap-3 relative overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
            <div className="p-2 bg-violet-500/20 rounded-xl shrink-0">
              <BrainCircuit className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-[10px] font-bold text-white/90 uppercase tracking-widest">AI Insight</h4>
                <motion.div
                  className="px-1.5 py-0.5 bg-violet-500/20 rounded-full text-[8px] font-bold text-violet-400 uppercase tracking-wider"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  LIVE
                </motion.div>
              </div>
              <p className="text-[11px] text-white/55 leading-snug">
                High churn risk in <span className="text-violet-300 font-bold">Enterprise</span> segment.{" "}
                <span className="text-white/80 underline underline-offset-2 decoration-white/20 cursor-pointer hover:text-white transition-colors">
                  Initiate campaign →
                </span>
              </p>
            </div>
          </motion.div>

          {/* Live Activity Chart */}
          <motion.div
            variants={item}
            className="col-span-2 bg-white/[0.02] border border-white/[0.04] rounded-2xl p-3.5 h-20 flex items-end gap-0.5 relative overflow-hidden"
          >
            <div className="absolute top-3 left-3.5 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-blue-400" />
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.15em]">Live Activity</span>
            </div>
            {chartBars.map((height, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0.1 }}
                animate={{ scaleY: [height / 100, (height * 0.6) / 100, height / 100] }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.08,
                }}
                className="flex-1 rounded-t-[2px] origin-bottom"
                style={{
                  background: `linear-gradient(to top, rgba(99,102,241,0.5), rgba(139,92,246,0.2))`,
                  height: `${height}%`,
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12]/80 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
