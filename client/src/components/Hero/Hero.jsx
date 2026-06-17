import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, TrendingDown, Users, DollarSign, BrainCircuit } from "lucide-react";
import { cn } from "../../lib/utils.js";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] pointer-events-none -z-10">
        <div className="absolute top-[0%] left-[20%] w-[30%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full" />
        <div className="absolute top-[10%] right-[20%] w-[25%] h-[40%] bg-purple-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Content */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-md shadow-lg"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              v2.0 is now live
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            Predict churn <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/50 to-white/20">before it happens.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/60 max-w-lg leading-relaxed font-medium"
          >
            Turn your customer data into retention strategies. Our AI-powered
            platform identifies at-risk users with 98% accuracy, giving you the
            insights needed to keep them forever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button className="bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-white/90 hover:scale-105 transition-all flex items-center gap-2 group text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Start Analyzing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md hover:bg-white/10 transition-all flex items-center gap-2 text-lg font-medium">
              <Play className="w-5 h-5 fill-current" />
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-8 pt-8 border-t border-white/5 mt-4"
          >
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold tracking-tighter italic">500K+</span>
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Customers tracked</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold tracking-tighter italic">98%</span>
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Accuracy</span>
            </div>
          </motion.div>
        </div>

        {/* Bento Dashboard Preview */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
            className="grid grid-cols-6 grid-rows-6 gap-4 h-[600px] relative z-10"
          >
            {/* Main Chart Card */}
            <div className="col-span-4 row-span-3 bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] rounded-3xl p-6 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">Churn Rate</h3>
                  <p className="text-3xl font-bold tracking-tight mt-1">12.4%</p>
                </div>
                <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-xl shadow-inner">
                  <TrendingDown className="w-4 h-4 text-green-400" />
                </div>
              </div>
              <div className="h-40 flex items-end gap-1.5 relative z-10">
                {[40, 70, 45, 90, 65, 80, 50, 60, 85, 45, 75, 95].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="flex-1 bg-gradient-to-t from-blue-500/40 to-blue-400/10 rounded-t border-t border-blue-400/20"
                  />
                ))}
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="col-span-2 row-span-3 bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20 shadow-[inset_0_1px_0_0_rgba(168,85,247,0.2)] rounded-3xl p-6 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300">AI Insight</span>
              </div>
              <p className="text-sm leading-relaxed text-white/80 font-medium">
                Large segment of <span className="text-purple-400 font-bold">Enterprise</span> users showing reduced activity in API usage.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                  />
                </div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Risk level: High</span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="col-span-2 row-span-2 bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] rounded-3xl p-6 backdrop-blur-md group hover:bg-white/[0.08] transition-colors">
              <Users className="w-5 h-5 text-blue-400 mb-4 drop-shadow-md" />
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Active Users</p>
              <p className="text-2xl font-bold tracking-tight">24,512</p>
            </div>

            <div className="col-span-2 row-span-2 bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] rounded-3xl p-6 backdrop-blur-md group hover:bg-white/[0.08] transition-colors">
              <DollarSign className="w-5 h-5 text-green-400 mb-4 drop-shadow-md" />
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">MRR Saved</p>
              <p className="text-2xl font-bold tracking-tight">$1.2M</p>
            </div>

            <div className="col-span-2 row-span-3 bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] rounded-3xl p-6 backdrop-blur-md overflow-hidden flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Health Score</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-28 h-28 drop-shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="46" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-black/50" />
                    <motion.circle
                      cx="56" cy="56" r="46"
                      stroke="currentColor" strokeWidth="8" fill="transparent"
                      strokeDasharray="289"
                      initial={{ strokeDashoffset: 289 }}
                      animate={{ strokeDashoffset: 289 * 0.15 }}
                      transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                      className="text-green-400"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl tracking-tighter">
                    85%
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-4 row-span-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-2xl p-4 flex items-center justify-between backdrop-blur-md">
              <span className="text-sm font-medium text-white/80">Automatic retention emails enabled</span>
              <div className="w-10 h-5 bg-blue-500 rounded-full flex items-center px-1 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                <div className="w-3 h-3 bg-white rounded-full translate-x-5 shadow-sm" />
              </div>
            </div>
          </motion.div>

          {/* Decorative floating elements */}
          <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
